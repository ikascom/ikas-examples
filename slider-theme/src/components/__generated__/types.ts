import {
	IkasImage,
	IkasNavigationLink,
} from "@ikas/storefront"

export enum Position{ 
	"LEFT" = "LEFT",
	"CENTER" = "CENTER",
	"RIGHT" = "RIGHT",
};

export type Slide = { 
	image: IkasImage;
	title?: string;
	buttonLink?: IkasNavigationLink;
	position?: Position;
};

export type SliderProps = {
	slides?: Slide[];
};

