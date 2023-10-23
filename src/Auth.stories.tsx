import type { Meta, StoryFn } from "@storybook/react";
import { Auth } from "./Auth";

/**
 * Firex auth capabilities
 */

const meta = {
	title: "firex/Auth",
	component: Auth,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Auth>;

export default meta;

type Story = StoryFn<typeof meta>;

export const AuthTest: Story = () => {
	return <Auth />;
};
