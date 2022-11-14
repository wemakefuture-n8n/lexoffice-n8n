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
				{
					// 'name' is displayed to the user?
					name: 'Get',
					value: 'retrieveOneContact',
					action: 'Retrieve a contact',
					description: 'Retrieve a Contact',
					routing: {
						request: {
							method: 'GET',
							url: '=/contacts/{{$parameter.contactID}}',
						},
					},
				},
				// TODO: Add operation for POST Create a Contact
			],
			default: 'retrieveOneContact',
		},
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

		// Optional/additional fields will go here

		]
	};
}
