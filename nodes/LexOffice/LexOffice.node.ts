import { INodeType, INodeTypeDescription } from 'n8n-workflow';


export class LexOffice implements INodeType {
	description: INodeTypeDescription = {

		// Basic node details will go here

		displayName: 'LexOffice',
name: 'LexOffice',
icon: 'file:lexoffice.svg',
group: ['transform'],
version: 1,
subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
description: 'LexOffice API Operations',
defaults: {
	name: 'LexOffice API Operations',
},
inputs: ['main'],
outputs: ['main'],
credentials: [
	{
		name: 'lexOfficeApi',
		required: true,
	},
],
requestDefaults: {
	baseURL: 'https://api.lexoffice.io/v1',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
},
		properties: [

		// Resources and operations will go here

		{
			displayName: 'Resource',
			name: 'resource',
			type: 'options',
			noDataExpression: true,
			options: [
				{
					name: 'Contacts Endpoint',
					value: 'contactsEndpoint',
				}
			],
			default: 'contactsEndpoint',
		},

		// Operations will go here

		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: [
						'contactsEndpoint',
					],
				},
			},
			options: [
			//	operation for GET retrieve a contact
				{
					name: 'Retrieve a Contact',
					value: 'retrieveOneContact',
					action: 'Retrieve a contact',
					routing: {
						request: {
							method: 'GET',
							url: '=/contacts/{{$parameter.contactID}}',
						},
					},
				},
				// operation for POST create a person
				{
					name: 'Create Person',
					value: 'createPerson',
					action: 'Create person',
					description: 'Create a person',
					routing: {
						request: {
							method: 'POST',
							url: '/contacts',
							body: {
								"version": 0,
								"roles": {
									"customer": {
									}
								},
								"person": '={{$parameter.personDetailsUI.personDetails}}',
								"note": '={{$parameter.note}}'
							},
						},
					},
				},

				// operation for POST create a company
				{
					name: 'Create Company',
					value: 'createCompany',
					action: 'Create company',
					description: 'Create a company',
					routing: {
						request: {
							method: 'POST',
							url: '/contacts',
							body: {
								"version": 0,
								"roles": {
									"customer": {
									}
								},
								"company": {
									 "name": '={{$parameter.companyName}}',
									 "contactPersons": '={{$parameter.contactPersonsUI.contactPersons}}'
								},
								"note": '={{$parameter.note}}'
							},
						},
					},
				},


			],
			default: 'retrieveOneContact',
		},
      // Fields for retrieveOneContact operation
		{
			displayName: 'Contact ID',
			description: 'Type in Contact ID to retrieve',
			required: true,
			name: 'contactID',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					resource: [
						'contactsEndpoint',
					],
					operation: [
						'retrieveOneContact',
					]
				},
			},
		},
		// Fields for create company operations
		{
			displayName: 'Company Name',
			description: 'Type in company name',
			name: 'companyName',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					resource: [
						'contactsEndpoint',
					],
					operation: [
						'createCompany'
					]
				},
			},
		},
		{
			displayName: 'Contact Persons',
			name: 'contactPersonsUI',
			placeholder: 'Add Contact Person',
			type: 'fixedCollection',
			default: {},
			typeOptions: {
				multipleValues: true,
			},
			description: 'Add Contact Persons',
			options: [
				{
					name: 'contactPersons',
					displayName: 'Contact Persons',
					values: [
						{
							displayName: 'Salutation',
							name: 'salutation',
							type: 'string',
							default: '',
							description: 'Type in salutation for person',
						},
						{
							displayName: 'First Name',
							name: 'firstName',
							type: 'string',
							default: '',
							description: 'Type in first name for person',
						},
						{
							displayName: 'Last Name',
							required: true,
							name: 'lastName',
							type: 'string',
							default: '',
							description: 'Type in last name for person',
						},
						{
							displayName: 'Email Address',
							name: 'emailAddress',
							type: 'string',
							default: '',
							description: 'Type in email address for person',
						},
						{
							displayName: 'Phone Number',
							name: 'phoneNumber',
							type: 'string',
							default: '',
							description: 'Type in phone number for person',
						},
					],
				},
			],
			displayOptions: {
				show: {
					resource: [
						'contactsEndpoint',
					],
					operation: [
						'createCompany'
					]
				}
			},
		},
       // Fields for create person operations
	   {
		displayName: 'Person Details',
		name: 'personDetailsUI',
		placeholder: 'Add Person Details',
		type: 'fixedCollection',
		default: {},
		typeOptions: {
			multipleValues: false,
		},
		description: 'Add Person Details',
		options: [
			{
				name: 'personDetails',
				displayName: 'Person Details',
				values: [
					{
						displayName: 'Salutation',
						name: 'salutation',
						type: 'string',
						default: '',
						description: 'Type in salutation for person',
					},
					{
						displayName: 'First Name',
						name: 'firstName',
						type: 'string',
						default: '',
						description: 'Type in first name for person',
					},
					{
						displayName: 'Last Name',
						name: 'lastName',
						required: true,
						type: 'string',
						default: '',
						description: 'Type in last name for person',
					},
					{
						displayName: 'Email Address',
						name: 'emailAddress',
						type: 'string',
						default: '',
						description: 'Type in email address for person',
					},
					{
						displayName: 'Phone Number',
						name: 'phoneNumber',
						type: 'string',
						default: '',
						description: 'Type in phone number for person',
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: [
					'contactsEndpoint',
				],
				operation: [
					'createPerson'
				]
			}
		},
	},

		// Optional/additional fields will go here

		// TODO: Select param for available roles for company and person


		]
	};
}
