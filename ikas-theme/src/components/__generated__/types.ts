import {
	IkasImage,
	IkasNavigationLink,
	IkasProduct,
} from "@ikas/storefront"

export enum ImageAspectRatio{ 
	"_1_1" = "1_1",
	"_16_9" = "16_9",
	"_3_1" = "3_1",
	"_4_3" = "4_3",
	"_21_9" = "21_9",
};

export type SocialMedia = { 
	facebook?: string;
	instagram?: string;
	twitter?: string;
	pinterest?: string;
};

export type HeroBannerProps = {
	image: IkasImage;
	imageAspectRatio: ImageAspectRatio;
	showContent: boolean;
	title: string;
	link: IkasNavigationLink;
};

export type HeaderProps = {
	logo: IkasImage;
};

export type FooterProps = {
	logo: IkasImage;
	links: IkasNavigationLink[];
	socialMedia: SocialMedia;
};

export type ProductDetailProps = {
	product: IkasProduct;
};

