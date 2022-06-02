import { APISelectMenuComponent, APISelectMenuOption, ComponentType } from 'discord-api-types/v10';
import { SelectMenuBuilder, SelectMenuOptionBuilder } from '../../src/index';

const selectMenu = () => new SelectMenuBuilder();
const selectMenuOption = () => new SelectMenuOptionBuilder();

const longStr = 'a'.repeat(256);

const selectMenuOptionData: APISelectMenuOption = {
	label: 'test',
	value: 'test',
	emoji: { name: 'test' },
	default: true,
	description: 'test',
};

const selectMenuDataWithoutOptions = {
	type: ComponentType.SelectMenu,
	custom_id: 'test',
	max_values: 10,
	min_values: 3,
	disabled: true,
	placeholder: 'test',
} as const;

const selectMenuData: APISelectMenuComponent = {
	...selectMenuDataWithoutOptions,
	options: [selectMenuOptionData],
};

describe('Select Menu Components', () => {
	describe('Assertion Tests', () => {
		test('GIVEN valid inputs THEN Select Menu does not throw', () => {
			expect(() => selectMenu().setCustomId('foo')).not.toThrowError();
			expect(() => selectMenu().setMaxValues(10)).not.toThrowError();
			expect(() => selectMenu().setMinValues(3)).not.toThrowError();
			expect(() => selectMenu().setDisabled(true)).not.toThrowError();
			expect(() => selectMenu().setDisabled()).not.toThrowError();
			expect(() => selectMenu().setPlaceholder('description')).not.toThrowError();
			const option = selectMenuOption()
				.setLabel('test')
				.setValue('test')
				.setDefault(true)
				.setEmoji({ name: 'test' })
				.setDescription('description');
			expect(() => selectMenu().addOptions([option])).not.toThrowError();
			expect(() => selectMenu().setOptions([option])).not.toThrowError();
			expect(() => selectMenu().setOptions([{ label: 'test', value: 'test' }])).not.toThrowError();
			expect(() =>
				selectMenu().addOptions([
					{
						label: 'test',
						value: 'test',
						emoji: {
							id: '123',
							name: 'test',
							animated: true,
						},
					},
				]),
			).not.toThrowError();

			const options = new Array<APISelectMenuOption>(25).fill({ label: 'test', value: 'test' });
			expect(() => selectMenu().addOptions(options)).not.toThrowError();
			expect(() => selectMenu().setOptions(options)).not.toThrowError();

			expect(() =>
				selectMenu()
					.addOptions([{ label: 'test', value: 'test' }])
					.addOptions(new Array<APISelectMenuOption>(24).fill({ label: 'test', value: 'test' })),
			).not.toThrowError();
		});

		test('GIVEN invalid inputs THEN Select Menu does throw', () => {
			expect(() => selectMenu().setCustomId(longStr)).toThrowError();
			expect(() => selectMenu().setMaxValues(30)).toThrowError();
			expect(() => selectMenu().setMinValues(-20)).toThrowError();
			// @ts-expect-error
			expect(() => selectMenu().setDisabled(0)).toThrowError();
			expect(() => selectMenu().setPlaceholder(longStr)).toThrowError();
			// @ts-expect-error
			expect(() => selectMenu().addOptions([{ label: 'test' }])).toThrowError();
			expect(() => selectMenu().addOptions([{ label: longStr, value: 'test' }])).toThrowError();
			expect(() => selectMenu().addOptions([{ value: longStr, label: 'test' }])).toThrowError();
			expect(() => selectMenu().addOptions([{ label: 'test', value: 'test', description: longStr }])).toThrowError();
			// @ts-expect-error
			expect(() => selectMenu().addOptions([{ label: 'test', value: 'test', default: 100 }])).toThrowError();
			// @ts-expect-error
			expect(() => selectMenu().addOptions([{ value: 'test' }])).toThrowError();
			// @ts-expect-error
			expect(() => selectMenu().addOptions([{ default: true }])).toThrowError();

			const tooManyOptions = new Array<APISelectMenuOption>(26).fill({ label: 'test', value: 'test' });
			expect(() => selectMenu().setOptions(tooManyOptions)).toThrowError();

			expect(() =>
				selectMenu()
					.addOptions([{ label: 'test', value: 'test' }])
					.addOptions(tooManyOptions),
			).toThrowError();

			expect(() => {
				selectMenuOption()
					.setLabel(longStr)
					.setValue(longStr)
					// @ts-expect-error
					.setDefault(-1)
					// @ts-expect-error
					.setEmoji({ name: 1 })
					.setDescription(longStr);
			}).toThrowError();
		});

		test('GIVEN valid JSON input THEN valid JSON history is correct', () => {
			expect(
				new SelectMenuBuilder(selectMenuDataWithoutOptions)
					.addOptions([new SelectMenuOptionBuilder(selectMenuOptionData)])
					.toJSON(),
			).toEqual(selectMenuData);
			expect(new SelectMenuOptionBuilder(selectMenuOptionData).toJSON()).toEqual(selectMenuOptionData);
		});
	});
});
