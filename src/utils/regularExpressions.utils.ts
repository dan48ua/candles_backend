const EMAIL_EXPRESSION = new RegExp(/^[a-zA-Z0–9. _-]+@[a-zA-Z0–9]+[.][a-zA-Z]/)
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
