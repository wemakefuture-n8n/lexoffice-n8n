import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class LexOffice implements INodeType {
	description: INodeTypeDescription = {

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
			baseURL: 'https://api.lexoffice.io',
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
					{
						name: 'Invoices Endpoint',
						value: 'invoicesEndpoint',
					},
					{
						name: 'Files Endpoint',
						value: 'filesEndpoint',
					},
				],
				default: 'contactsEndpoint',
			},

// Operations for contactsEndpoint will go here

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
								url: '/v1/contacts',
								body: {
									version: 0,
									roles: {
										customer: {},
									},
									company: {

									},
									addresses: {

									},
									emailAddresses: {
										business: [],
									},
									phoneNumbers: {
										mobile: [],
										private: [],
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
								url: '/v1/contacts',
								body: {
									version: 0,
									roles: {
										customer: {},
										vendor: {},
									},
									company: {
										contactPersons: [],
									},
									addresses: {
										billing: [],
									},
									emailAddresses: {
										business: [],
									},
									phoneNumbers: {
										mobile: [],
										private: [],
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
								url: '/v1/contacts',
								body: {
									version: 0,
									roles: {
										vendor: {},
									},
									company: {
										contactPersons: [],
									},
									addresses: {
										billing: [],
									},
									emailAddresses: {
										business: [],
									},
									phoneNumbers: {
										mobile: [],
										private: [],
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
								url: '/v1/contacts',
								body: {
									version: 0,
									roles: {
										customer: {},
									},
									person: {},
									addresses: {
										billing: [],
									},
									emailAddresses: {
										business: [],
									},
									phoneNumbers: {
										mobile: [],
										private: [],
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
								url: '/v1/contacts',
								body: {
									version: 0,
									roles: {
										customer: {},
										vendor: {},
									},
									person: {},
									addresses: {
										billing: [],
									},
									emailAddresses: {
										business: [],
									},
									phoneNumbers: {
										mobile: [],
										private: [],
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
								url: '/v1/contacts',
								body: {
									version: 0,
									roles: {
										vendor: {},
									},
									person: {},
									addresses: {
										billing: [],
									},
									emailAddresses: {
										business: [],
									},
									phoneNumbers: {
										mobile: [],
										private: [],
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
								url: '=/v1/contacts/{{$parameter.contactID}}',
							},
						},
					},
				],
				default: 'retrieveOneContact',
			},

			// Fields for contactsEndpoint



			// Fields for retrieveOneContact operation
			{
				displayName: 'Contact ID',
				description: 'Type in Contact ID to retrieve',
				required: true,
				hint: 'Returns the contact with id value provided.',
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
				required: true,
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'company.name',
					},
				},
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
					multipleValues: false,
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
								routing: {
									send: {
										type: 'body',
										property: 'company.contactPersons[0].salutation',
									},
								},
							},
							{
								displayName: 'First Name',
								name: 'firstName',
								type: 'string',
								default: '',
								description: 'Type in first name for person',
								routing: {
									send: {
										type: 'body',
										property: 'company.contactPersons[0].firstName',
									},
								},
							},
							{
								displayName: 'Last Name',
								required: true,
								name: 'lastName',
								type: 'string',
								default: '',
								description: 'Type in last name for person',
								routing: {
									send: {
										type: 'body',
										property: 'company.contactPersons[0].lastName',
									},
								},
							},
							{
								displayName: 'Email Address',
								name: 'emailAddress',
								type: 'string',
								default: '',
								description: 'Type in email address for person',
								routing: {
									send: {
										type: 'body',
										property: 'company.contactPersons[0].emailAddress',
									},
								},
							},
							{
								displayName: 'Phone Number',
								name: 'phoneNumber',
								type: 'string',
								default: '',
								description: 'Type in phone number for person',
								routing: {
									send: {
										type: 'body',
										property: 'company.contactPersons[0].phoneNumber',
									},
								},
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
								routing: {
									send: {
										type: 'body',
										property: 'person.salutation',
									},
								},
							},
							{
								displayName: 'First Name',
								name: 'firstName',
								type: 'string',
								default: '',
								description: 'Type in first name for person',
								routing: {
									send: {
										type: 'body',
										property: 'person.firstName',
									},
								},
							},
							{
								displayName: 'Last Name',
								name: 'lastName',
								required: true,
								type: 'string',
								default: '',
								description: 'Type in last name for person',
								routing: {
									send: {
										type: 'body',
										property: 'person.lastName',
									},
								},
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
					multipleValues: false,
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
								routing: {
									send: {
										type: 'body',
										property: 'addresses.billing[0].street',
									},
								},
							},
							{
								displayName: 'Zip',
								name: 'zip',
								type: 'string',
								default: '',
								description: 'Type in billing zip',
								routing: {
									send: {
										type: 'body',
										property: 'addresses.billing[0].zip',
									},
								},
							},
							{
								displayName: 'City',
								name: 'city',
								type: 'string',
								default: '',
								description: 'Type in billing city',
								routing: {
									send: {
										type: 'body',
										property: 'addresses.billing[0].city',
									},
								},
							},
							{
								displayName: 'Country Code',
								name: 'countryCode',
								type: 'string',
								default: '',
								description:
									'Must contain the country code in the format of ISO 3166 alpha2 (e.g. DE is used for germany)',
									routing: {
										send: {
											type: 'body',
											property: 'addresses.billing[0].countryCode',
										},
									},
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


// Operations for invoicesEndpoint will go here

			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['invoicesEndpoint'],
					},
				},
				options: [
					{
						name: 'Render an Invoice Document (PDF)',
						value: 'renderAnInvoiceDocumentPdf',
						description: 'To download the pdf file of an invoice document, you need its documentFileId',
						action: 'Render an invoice document pdf',
						routing: {
							request: {
								method: 'GET',
								url: '=/v1/invoices/{{$parameter.invoiceID}}/document',
							},
						},
					},
					{
						name: 'Retrieve an Invoice',
						value: 'retrieveAnInvoice',
						action: 'Retrieve an invoice',
						description: 'Returns the invoice with ID value',
						routing: {
							request: {
								method: 'GET',
								url: '=/v1/invoices/{{$parameter.invoiceID}}',
							},
						},
					},
				],
				default: 'renderAnInvoiceDocumentPdf',
			},

						// Fields for renderAnInvoiceDocumentPdf and retrieveAnInvoice operations

			{
				displayName: 'Invoice ID',
				description: 'Type in Invoice ID',
				required: true,
				name: 'invoiceID',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['invoicesEndpoint'],
						operation: ['renderAnInvoiceDocumentPdf', 'retrieveAnInvoice'],
					},
				},
			},

// Operations for filesEndpoint will go here

{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['filesEndpoint'],
		},
	},
	options: [
		{
			name: 'Download a File',
			value: 'downloadAFile',
			action: 'Returns the file as binary data for document file id provided',
			description: 'Returns the file as binary data for document file ID provided',
			routing: {
				request: {
					method: 'GET',
					url: '=/v1/files/{{$parameter.documentFileId}}',
				},
			},
		},
	],
	default: 'downloadAFile',
},

// Fields for downloadAFile operation

			{
				displayName: 'Document File ID',
				description: 'Type in documentFileId to download',
				required: true,
				name: 'documentFileId',
				type: 'string',
				default: '',
				hint: 'Returns the file as binary data for id value provided.',
				displayOptions: {
					show: {
						resource: ['filesEndpoint'],
						operation: ['downloadAFile'],
					},
				},
			},

			// Optional/additional fields will go here

			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
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
				options: [
					{
						displayName: 'Mobile Phone Number',
						name: 'mobile',
						type: 'string',
						default: '',
						description: 'Type in mobile phone number',
						routing: {
							send: {
								type: 'body',
								property: 'phoneNumbers.mobile[0]',
							},
						},
					},
					{
						displayName: 'Private Phone Number',
						name: 'private',
						type: 'string',
						default: '',
						description: 'Type in private phone number',
						routing: {
							send: {
								type: 'body',
								property: 'phoneNumbers.private[0]',
							},
						},
					},
					{
						displayName: 'Business Email',
						name: 'business',
						type: 'string',
						default: '',
						description: 'Type in business email',
						routing: {
							send: {
								type: 'body',
								property: 'emailAddresses.business[0]',
							},
						},
					},
				],
			},

		],
	};
}
