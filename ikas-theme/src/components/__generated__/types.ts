import {
	IkasImage,
	IkasNavigationLink,
	IkasSlider,
	IkasProduct,
	IkasBrand,
	IkasProductList,
	IkasCategory,
	IkasBlogList,
	IkasBlog,
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

export type Localization = { 
	text: string;
	buttonText: string;
	backgroundColor: string;
	color: string;
};

export type HeroBannerProps = {
	image: IkasImage;
	imageAspectRatio: ImageAspectRatio;
	title?: string;
	showButton?: boolean;
	link: IkasNavigationLink;
	buttonBackgroundColor: string;
	buttonTextColor: string;
};

export type HeaderProps = {
	logo: IkasImage;
	links?: IkasNavigationLink[];
	showLocalization?: boolean;
	localization: Localization;
	logoMaxWidth: IkasSlider;
	logoMaxHeight: IkasSlider;
	isLogoSizeDifferentOnMobile?: boolean;
	mobileLogoMaxWidth: IkasSlider;
	mobileLogoMaxHeight: IkasSlider;
};

export type FooterProps = {
	logo: IkasImage;
	links: IkasNavigationLink[];
	socialMedia?: SocialMedia;
};

export type ProductDetailProps = {
	product: IkasProduct;
	imageAspectRatio: ImageAspectRatio;
};

export type RegisterProps = {
	showMarketingEmailCheckbox?: boolean;
	marketingEmailCheckboxText: string;
	isMarketingEmailRequired?: boolean;
	marketingEmailDefaultChecked?: boolean;
};

export type PageBrandProps = {
	brand: IkasBrand;
	productList: IkasProductList;
};

export type PageCategoryProps = {
	category: IkasCategory;
	productList: IkasProductList;
};

export type PageSearchProps = {
	productList: IkasProductList;
};

export type CartProps = {
	summaryText?: string;
};

export type PageBlogsProps = {
	title?: string;
	blogList: IkasBlogList;
	showAuthor?: boolean;
	showDescription?: boolean;
	showCategory?: boolean;
	showPublishedDate?: boolean;
	imageAspectRatio: ImageAspectRatio;
};

export type PageBlogProps = {
	blog: IkasBlog;
	showImage?: boolean;
	imageAspectRatio: ImageAspectRatio;
};

export type PageBlogCategoryProps = {
	blogList: IkasBlogList;
	showAuthor?: boolean;
	showDescription?: boolean;
	showCategory?: boolean;
	showPublishedDate?: boolean;
	imageAspectRatio: ImageAspectRatio;
};

export type ProductReviewsProps = {
	productDetail: IkasProduct;
};

