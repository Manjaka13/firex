import type { Meta, StoryFn } from "@storybook/react";
import { Database } from "./Database";

/**
 * Firex database
 */

const meta = {
	title: "firex/Database",
	component: Database,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Database>;

export default meta;

type Story = StoryFn<typeof meta>;

export const DatabaseTest: Story = () => {
	return <Database />;
};
