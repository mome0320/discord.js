import { APIApplicationCommandAttachmentOption, ApplicationCommandOptionType } from 'discord-api-types/v10';
import { ApplicationCommandOptionBase } from '../mixins/ApplicationCommandOptionBase';

export class SlashCommandAttachmentOption extends ApplicationCommandOptionBase {
	public override readonly type = ApplicationCommandOptionType.Attachment as const;

	public toJSON(): APIApplicationCommandAttachmentOption {
		this.runRequiredValidations();

		return { ...this };
	}
}
