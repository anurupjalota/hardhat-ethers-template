import { expect } from 'chai'
import { setupGreeter } from './greeterFixure'

describe('Greeter', () => {
	it('should greet', async () => {
		const {
			deployer,
			users: [alice],
		} = await setupGreeter()

		expect(await deployer.Greeter.setGreeting('Hi, Alice!'))
			.to.emit(deployer.Greeter, 'SetGreeting')
			.withArgs('Hi, Alice!')

		expect(await alice.Greeter.greet()).to.equal('Hi, Alice!')
	})

	it('only owner can set greeting', async () => {
		const {
			deployer,
			users: [alice],
		} = await setupGreeter()

		await expect(alice.Greeter.setGreeting('Hi, Alice!')).to.be.reverted
		await expect(
			alice.Greeter.setGreeting('Hi, Alice!')
		).to.be.revertedWith('Ownable: caller is not the owner')

		await deployer.Greeter.setGreeting('Hi, Alice!')
	})
})
