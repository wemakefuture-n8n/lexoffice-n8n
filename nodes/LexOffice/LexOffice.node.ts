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
					},
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
						resource: ['contactsEndpoint'],
					},
				},
				options: [
					{
						name: 'Create Company - Customer',
						value: 'createCompanyAsCustomer',
						action: 'Create company with customer role',
						description: 'Create company with customer role',
						routing: {
							request: {
								method: 'POST',
								url: '/contacts',
								body: {
									version: 0,
									roles: {
										customer: {},
									},
									company: {
										name: '={{$parameter.companyName}}',
										contactPersons: '={{$parameter.contactPersonsUI.contactPersons}}',
									},
									addresses: {
										billing: '={{$parameter.billingUI.billing}}',
									},
									emailAddresses: {
										business: ['={{$parameter.emailAddressesUI.emailAddresses.business}}'],
									},
									phoneNumbers: {
										mobile: ['={{$parameter.phoneNumbersUI.phoneNumbers.mobile}}'],
										private: ['={{$parameter.phoneNumbersUI.phoneNumbers.private}}'],
									},
								},
							},
						},
					},
					{
						name: 'Create Company - Customer & Vendor',
						value: 'createCompanyAsCustomerAndVendor',
						action: 'Create company with both customer and vendor roles',
						description: 'Create company with both customer and vendor roles',
						routing: {
							request: {
								method: 'POST',
								url: '/contacts',
								body: {
									version: 0,
									roles: {
										customer: {},
										vendor: {},
									},
									company: {
										name: '={{$parameter.companyName}}',
										contactPersons: '={{$parameter.contactPersonsUI.contactPersons}}',
									},
									addresses: {
										billing: '={{$parameter.billingUI.billing}}',
									},
									emailAddresses: {
										business: ['={{$parameter.emailAddressesUI.emailAddresses.business}}'],
									},
									phoneNumbers: {
										mobile: ['={{$parameter.phoneNumbersUI.phoneNumbers.mobile}}'],
										private: ['={{$parameter.phoneNumbersUI.phoneNumbers.private}}'],
									},
								},
							},
						},
					},
					{
						name: 'Create Company - Vendor',
						value: 'createCompanyAsVendor',
						action: 'Create company with vendor role',
						description: 'Create company with vendor role',
						routing: {
							request: {
								method: 'POST',
								url: '/contacts',
								body: {
									version: 0,
									roles: {
										vendor: {},
									},
									company: {
										name: '={{$parameter.companyName}}',
										contactPersons: '={{$parameter.contactPersonsUI.contactPersons}}',
									},
									addresses: {
										billing: '={{$parameter.billingUI.billing}}',
									},
									emailAddresses: {
										business: ['={{$parameter.emailAddressesUI.emailAddresses.business}}'],
									},
									phoneNumbers: {
										mobile: ['={{$parameter.phoneNumbersUI.phoneNumbers.mobile}}'],
										private: ['={{$parameter.phoneNumbersUI.phoneNumbers.private}}'],
									},
								},
							},
						},
					},
					{
						name: 'Create Person - Customer',
						value: 'createPersonAsCustomer',
						action: 'Create person with customer role',
						description: 'Create person with customer role',
						routing: {
							request: {
								method: 'POST',
								url: '/contacts',
								body: {
									version: 0,
									roles: {
										customer: {},
									},
									person: '={{$parameter.personDetailsUI.personDetails}}',
									addresses: {
										billing: '={{$parameter.billingUI.billing}}',
									},
									emailAddresses: {
										business: ['={{$parameter.emailAddressesUI.emailAddresses.business}}'],
									},
									phoneNumbers: {
										mobile: ['={{$parameter.phoneNumbersUI.phoneNumbers.mobile}}'],
										private: ['={{$parameter.phoneNumbersUI.phoneNumbers.private}}'],
									},
								},
							},
						},
					},
					{
						name: 'Create Person - Customer & Vendor',
						value: 'createPersonAsCustomerAndVendor',
						action: 'Create person with both customer and vendor roles',
						description: 'Create person with both customer and vendor roles',
						routing: {
							request: {
								method: 'POST',
								url: '/contacts',
								body: {
									version: 0,
									roles: {
										customer: {},
										vendor: {},
									},
									person: '={{$parameter.personDetailsUI.personDetails}}',
									addresses: {
										billing: '={{$parameter.billingUI.billing}}',
									},
									emailAddresses: {
										business: ['={{$parameter.emailAddressesUI.emailAddresses.business}}'],
									},
									phoneNumbers: {
										mobile: ['={{$parameter.phoneNumbersUI.phoneNumbers.mobile}}'],
										private: ['={{$parameter.phoneNumbersUI.phoneNumbers.private}}'],
									},
								},
							},
						},
					},
					{
						name: 'Create Person - Vendor',
						value: 'createPersonAsVendor',
						action: 'Create person with vendor role',
						description: 'Create person with vendor role',
						routing: {
							request: {
								method: 'POST',
								url: '/contacts',
								body: {
									version: 0,
									roles: {
										vendor: {},
									},
									person: '={{$parameter.personDetailsUI.personDetails}}',
									addresses: {
										billing: '={{$parameter.billingUI.billing}}',
									},
									emailAddresses: {
										business: ['={{$parameter.emailAddressesUI.emailAddresses.business}}'],
									},
									phoneNumbers: {
										mobile: ['={{$parameter.phoneNumbersUI.phoneNumbers.mobile}}'],
										private: ['={{$parameter.phoneNumbersUI.phoneNumbers.private}}'],
									},
								},
							},
						},
					},
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
						resource: ['contactsEndpoint'],
						operation: ['retrieveOneContact'],
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
						resource: ['contactsEndpoint'],
						operation: [
							'createCompanyAsCustomer',
							'createCompanyAsCustomerAndVendor',
							'createCompanyAsVendor',
						],
					},
				},
			},
			{
				displayName: 'Contact Persons',
				name: 'contactPersonsUI',
				placeholder: 'Add Contact Person',
				type: 'fixedCollection',
				default: [],
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
								hint: 'Herr or Frau',
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
						resource: ['contactsEndpoint'],
						operation: ['createCompanyAsCustomer',
						'createCompanyAsCustomerAndVendor',
						'createCompanyAsVendor',],
					},
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
								hint: 'Herr or Frau',
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
						],
					},
				],
				displayOptions: {
					show: {
						resource: ['contactsEndpoint'],
						operation: [
							'createPersonAsCustomer',
							'createPersonAsCustomerAndVendor',
							'createPersonAsVendor'
					],
					},
				},
			},

      // Fields for create company & create person operations

			{
				displayName: 'Billing Addresses',
				name: 'billingUI',
				placeholder: 'Add Billing Address',
				type: 'fixedCollection',
				default: [],
				typeOptions: {
					multipleValues: true,
				},
				description: 'Add Billing Address',
				options: [
					{
						name: 'billing',
						displayName: 'Billing',
						values: [
							{
								displayName: 'Street',
								name: 'street',
								type: 'string',
								default: '',
								description: 'Type in billing street',
							},
							{
								displayName: 'Zip',
								name: 'zip',
								type: 'string',
								default: '',
								description: 'Type in billing zip',
							},
							{
								displayName: 'City',
								name: 'city',
								type: 'string',
								default: '',
								description: 'Type in billing city',
							},
							{
								displayName: 'Country Code',
								name: 'countryCode',
								type: 'string',
								default: '',
								description:
									'Must contain the country code in the format of ISO 3166 alpha2 (e.g. DE is used for germany)',
							},
						],
					},
				],
				displayOptions: {
					show: {
						resource: ['contactsEndpoint'],
						operation: [
						'createPersonAsCustomer',
						'createPersonAsCustomerAndVendor',
						'createPersonAsVendor',

						'createCompanyAsCustomer',
						'createCompanyAsCustomerAndVendor',
						'createCompanyAsVendor'],
					},
				},
			},
			{
				displayName: 'Email Address',
				name: 'emailAddressesUI',
				placeholder: 'Add Email Address',
				type: 'fixedCollection',
				default: {},
				typeOptions: {
					multipleValues: false,
				},
				description: 'Add Email Address',
				options: [
					{
						name: 'emailAddresses',
						displayName: 'Email Addresses',
						values: [
							{
								displayName: 'Business',
								name: 'business',
								type: 'string',
								default: '',
								description: 'Type in business email',
							},
						],
					},
				],
				displayOptions: {
					show: {
						resource: ['contactsEndpoint'],
						operation: ['createPersonAsCustomer',
						'createPersonAsCustomerAndVendor',
						'createPersonAsVendor',

						'createCompanyAsCustomer',
						'createCompanyAsCustomerAndVendor',
						'createCompanyAsVendor'],
					},
				},
			},
			{
				displayName: 'Phone Number',
				name: 'phoneNumbersUI',
				placeholder: 'Add Phone Number',
				type: 'fixedCollection',
				default: {},
				typeOptions: {
					multipleValues: false,
				},
				description: 'Add Phone Number',
				options: [
					{
						name: 'phoneNumbers',
						displayName: 'Phone Numbers',
						values: [
							{
								displayName: 'Mobile',
								name: 'mobile',
								type: 'string',
								default: '',
								description: 'Type in mobile phone number',
							},
							{
								displayName: 'Private',
								name: 'private',
								type: 'string',
								default: '',
								description: 'Type in private phone number',
							},
						],
					},
				],
				displayOptions: {
					show: {
						resource: ['contactsEndpoint'],
						operation: ['createPersonAsCustomer',
						'createPersonAsCustomerAndVendor',
						'createPersonAsVendor',

						'createCompanyAsCustomer',
						'createCompanyAsCustomerAndVendor',
						'createCompanyAsVendor'],
					},
				},
			},

			// Optional/additional fields will go here

			// TODO: Select param for available roles for company and person
			// TODO: Multiple values for 'contact persons' and 'billing addresses' collections throw size error (in postman as well) if > 1
			// TODO: Function to remove empty params and collections

		],
	};
}
