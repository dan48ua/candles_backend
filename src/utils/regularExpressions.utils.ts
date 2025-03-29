const EMAIL_EXPRESSION = new RegExp(
	/^(?:(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)|(?:"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x00-\x7f])*"))@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|\[(?:(?:(25[0-5]|2[0-4]\d|[01]?\d\d?)(?:\.(?!$)|$)){4}|IPv6:[a-fA-F0-9:]+)\])$/
)
const PHONE_EXPRESSION = new RegExp(
	/(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g
)

export class RegularExpressinos {
	public emailEx(email: string) {
		const isEmail = EMAIL_EXPRESSION.test(email)
		if (!isEmail) {
			throw new Error('Invalid email type')
		}
		return true
	}
	public phoneEx(phone: string) {
		const isPhone = PHONE_EXPRESSION.test(phone)
		if (!isPhone) {
			throw new Error('Invalid phone number')
		}
		return true
	}
}
