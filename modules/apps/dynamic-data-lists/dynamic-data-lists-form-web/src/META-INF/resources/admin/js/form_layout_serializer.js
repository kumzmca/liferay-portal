AUI.add(
	'liferay-ddl-form-builder-layout-serializer',
	function(A) {
		var AArray = A.Array;

		var Field = Liferay.DDM.Renderer.Field;

		var LayoutSerializer = A.Component.create(
			{
				ATTRS: {
					builder: {
						value: {}
					},

					columnHandler: {
						valueFn: '_valueColumnHandler'
					},

					pageHandler: {
						valueFn: '_valuePageHandler'
					},

					rowHandler: {
						valueFn: '_valueRowHandler'
					}
				},

				EXTENDS: Liferay.DDL.LayoutVisitor,

				NAME: 'liferay-ddl-form-builder-layout-serializer',

				prototype: {
					_valueColumnHandler: function() {
						var instance = this;

						return instance.serializeColumn;
					},

					_valuePageHandler: function() {
						var instance = this;

						return instance.serializePage;
					},

					_valueRowHandler: function() {
						var instance = this;

						return instance.serializeRow;
					},

					serialize: function() {
						var instance = this;

						return A.JSON.stringify(
							{
								pages: instance.visit()
							}
						);
					},

					serializeColumn: function(column) {
						var instance = this;

						var fieldsList = column.get('value');

						var serializedColumn = {
							size: column.get('size')
						};

						if (A.instanceOf(fieldsList, A.FormBuilderFieldList)) {
							var fields = fieldsList.get('fields');

							if (fields.length > 0) {
								serializedColumn.fieldName = fields[0].get('name');
							}
						}

						return serializedColumn;
					},

					serializePage: function(page, index) {
						var instance = this;

						var builder = instance.get('builder');

						var pages = builder._pages;

						var descriptions = pages.get('descriptions');
						var titles = pages.get('titles');

						return {
							description: {
								en_US: descriptions[index] || ''
							},
							rows: instance.visitRows(page.get('rows')),
							title: {
								en_US: titles[index] || index + 1
							}
						};
					},

					serializeRow: function(row) {
						var instance = this;

						return {
							columns: instance.visitColumns(row.get('cols'))
						};
					}
				}
			}
		);

		Liferay.namespace('DDL').LayoutSerializer = LayoutSerializer;
	},
	'',
	{
		requires: ['liferay-ddl-form-builder-layout-visitor', 'liferay-ddm-form-renderer-field']
	}
);