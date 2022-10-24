import { INodeProperties } from 'n8n-workflow';

// When the resource `httpVerb` is selected, this `operation` parameter will be shown.
export const httpVerbOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,

		displayOptions: {
			show: {
				resource: ['httpVerb'],
			},
		},
		options: [
			{
				name: 'GET',
				value: 'get',
				action: 'Perform a GET request',
				routing: {
					request: {
						method: 'GET',
						url: '/get',
					},
					output: {
						postReceive: [
							{
								// When the returned data is nested under another property
								// Specify that property key
								type: 'rootProperty',
								properties: {
									property: 'headers',
								},
							},
						],
					},
				},
			},
			{
				name: 'DELETE',
				value: 'delete',
				action: 'Perform a DELETE request',
				routing: {
					request: {
						method: 'DELETE',
						url: '/delete',
					},
				},
			},
		],
		default: 'get',
	},
];

// Here we define what to show when the `get` operation is selected.
// We do that by adding `operation: ["get"]` to `displayOptions.show`
const getOperation: INodeProperties[] = [
	{
		name: 'typeofData',
		default: 'queryParameter',
		description: 'Select type of data to send [Query Parameters]',
		displayName: 'Type of Data',
		displayOptions: {
			show: {
				resource: ['httpVerb'],
				operation: ['get'],
			},
		},
		type: 'options',
		options: [
			{
				name: 'Query',
				value: 'queryParameter',
			},
		],
		required: true,
	},
	{
		name: 'arguments',
		default: {},
		description: "The request's query parameters",
		displayName: 'Query Parameters',
		displayOptions: {
			show: {
				resource: ['httpVerb'],
				operation: ['get'],
			},
		},
		options: [
			{
				name: 'keyvalue',
				displayName: 'Key:Value',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'string',
						default: '',
						required: true,
						description: 'Key of query parameter',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								property: '={{$parent.key}}',
								type: 'query',
							},
						},
						required: true,
						description: 'Value of query parameter',
					},
				],
			},
		],
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
	},
];

// Here we define what to show when the DELETE Operation is selected.
// We do that by adding `operation: ["delete"]` to `displayOptions.show`
const deleteOperation: INodeProperties[] = [
	{
		name: 'typeofData',
		default: 'queryParameter',
		description: 'Select type of data to send [Query Parameter Arguments, JSON-Body]',
		displayName: 'Type of Data',
		displayOptions: {
			show: {
				resource: ['httpVerb'],
				operation: ['delete'],
			},
		},
		options: [
			{
				name: 'Query',
				value: 'queryParameter',
			},
			{
				name: 'JSON',
				value: 'jsonData',
			},
		],
		required: true,
		type: 'options',
	},
	{
		name: 'arguments',
		default: {},
		description: "The request's query parameters",
		displayName: 'Query Parameters',
		displayOptions: {
			show: {
				resource: ['httpVerb'],
				operation: ['delete'],
				typeofData: ['queryParameter'],
			},
		},
		options: [
			{
				name: 'keyvalue',
				displayName: 'Key:Value',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'string',
						default: '',
						required: true,
						description: 'Key of query parameter',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								property: '={{$parent.key}}',
								type: 'query',
							},
						},
						required: true,
						description: 'Value of query parameter',
					},
				],
			},
		],
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
	},
	{
		name: 'arguments',
		default: {},
		description: "The request's JSON properties",
		displayName: 'JSON Object',
		displayOptions: {
			show: {
				resource: ['httpVerb'],
				operation: ['delete'],
				typeofData: ['jsonData'],
			},
		},
		options: [
			{
				displayName: 'Outage?',
				name: 'isOutage',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						type: 'body',
						property: 'IsOutage',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Unread?',
				name: 'IsUnRead',
				type: 'boolean',
				default: true,
			},
			{
				displayName: 'Employee ID',
				name: 'CustomerLink_RecID',
				type: 'string',
				default: '',
				routing: {
					send: {
						property: 'CustomerLink_RecID',
						type: 'body',
					},
				},
			},
			{
				displayName: 'Owner Team',
				name: 'OwnerTeam',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Start Date Time',
				name: 'EventStartDateTime',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'CI Name',
				name: 'CIName',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Support Hours',
				name: 'SupportHours',
				type: 'options',
				options: [
					{
						name: '9x5',
						value: '9x5',
					},
					{
						name: '24x7',
						value: '24x7',
					},
				],
				default: '9x5',
			},
			{
				displayName: 'Severity',
				name: 'Severity',
				type: 'options',
				options: [
					{
						name: 'Low',
						value: 'Low',
					},
					{
						name: 'Medium',
						value: 'Medium',
					},
					{
						name: 'High',
						value: 'High',
					},
				],
				default: 'Low',
			},
			{
				displayName: 'Custom Fields',
				name: 'customProperties',
				type: 'fixedCollection',
				default: {},
				placeholder: 'Add Custom Field',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'property',
						displayName: 'Custom Field',
						values: [
							{
								displayName: 'Field Name or ID',
								name: 'name',
								type: 'string',
								default: '',
								description:
									'Name of the custom field to set. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
							},
							{
								displayName: 'Field Value',
								name: 'value',
								type: 'string',
								default: '',
								routing: {
									send: {
										property: '={{$parent.name}}',
										type: 'body',
									},
								},
								description: 'Value to set on the custom field',
							},
						],
					},
				],
			},
		],
		// options: [
		// 	{
		// 		name: 'keyvalue',
		// 		displayName: 'Key:Value',
		// 		values: [
		// 			{
		// 				displayName: 'Key',
		// 				name: 'key',
		// 				type: 'string',
		// 				default: '',
		// 				required: true,
		// 				description: 'Key of JSON property',
		// 			},
		// 			{
		// 				displayName: 'Value',
		// 				name: 'value',
		// 				type: 'string',
		// 				default: '',
		// 				routing: {

		// 					send: {
		// 						property: '={{$parent.key}}',
		// 						type: 'body',
		// 					},
		// 				},
		// 				required: true,
		// 				description: 'Value of JSON property',
		// 			},
		// 		],
		// 	},
		// 	{
		// 		name: 'predefinedProperties',
		// 		displayName: 'Predefined Properties',
		// 		values: [
		// 			{
		// 				displayName: 'Status',
		// 				name: 'status',
		// 				type: 'string',
		// 				default: '',
		// 				routing: {

		// 					send: {
		// 						property: 'Status',
		// 						type: 'body',
		// 						value: '={{$parent.value}}'
		// 					},
		// 				},
		// 				required: true,
		// 				description: 'Value of JSON property',
		// 			},
		// 			{
		// 				displayName: 'Severity',
		// 				name: 'severity',
		// 				type: 'string',
		// 				default: '',
		// 				routing: {

		// 					send: {
		// 						property: 'Severity',
		// 						type: 'body',
		// 						value: '={{$parent.value}}'
		// 					},
		// 				},
		// 				required: true,
		// 				description: 'Value of JSON property',
		// 			},
		// 		],
		// 	},
		// ],
		type: 'collection',
		// typeOptions: {
		// 	multipleValues: true,
		// },
	},
];

export const httpVerbFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                httpVerb:get                                */
	/* -------------------------------------------------------------------------- */
	...getOperation,

	/* -------------------------------------------------------------------------- */
	/*                              httpVerb:delete                               */
	/* -------------------------------------------------------------------------- */
	...deleteOperation,
];
