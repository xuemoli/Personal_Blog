import type { SponsorConfig } from "../types/sponsorConfig";

export const sponsorConfig: SponsorConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// 打赏用途说明
	usage:
		"您的打赏将用于服务器维护、内容创作和功能开发，帮助我持续提供优质内容。",

	// 是否显示打赏者列表
	showSponsorsList: true,

	// 是否显示评论区，需要先在commentConfig.ts启用评论系统
	showComment: true,

	// 是否在文章详情页底部显示打赏按钮
	showButtonInPost: false,

	// 打赏方式列表
	// qrCode: 收款码图片路径（放在 public 目录下，如 /assets/images/sponsor/alipay.png）
	// link:   打赏链接，填写后会显示「前往打赏」按钮（新标签页打开）
	// enabled: false 时该方式不显示
	// 两项都填则二维码和按钮同时显示
	methods: [
		{
			name: "支付宝",
			icon: "fa7-brands:alipay",
			// ⚠️ 换成你自己的收款码：替换 public/assets/images/sponsor/alipay.png
			qrCode: "/assets/images/sponsor/alipay.png",
			link: "",
			description: "使用 支付宝 扫码打赏",
			enabled: true,
		},
		{
			name: "微信",
			icon: "fa7-brands:weixin",
			// ⚠️ 换成你自己的收款码：替换 public/assets/images/sponsor/wechat.png
			qrCode: "/assets/images/sponsor/wechat.png",
			link: "",
			description: "使用 微信 扫码打赏",
			enabled: true,
		},
		{
			// 爱发电：把 link 改成你自己的主页（https://ifdian.net/a/你的ID）后，再把 enabled 改为 true
			name: "爱发电",
			icon: "simple-icons:afdian",
			qrCode: "",
			link: "",
			description: "通过 爱发电 进行打赏",
			enabled: false,
		},
		{
			// ko-fi：把 link 改成你自己的主页（https://ko-fi.com/你的ID）后，再把 enabled 改为 true
			name: "ko-fi",
			icon: "simple-icons:kofi",
			qrCode: "",
			link: "",
			description: "Buy me a Coffee",
			enabled: false,
		},
	],

	// 打赏者列表（可选）
	// 有 avatar 就显示头像图片，没有则用名字首字母生成头像；amount 和 date 都可以省略
	// 想显示匿名可以直接把 name 写成「匿名」
	sponsors: [
		// {
		// 	name: "某某",
		// 	avatar: "https://example.com/avatar.png",
		// 	amount: "¥50",
		// 	date: "2025-10-01",
		// },
		// {
		// 	name: "匿名",
		// 	amount: "¥20",
		// 	date: "2025-10-01",
		// },
	],
};
