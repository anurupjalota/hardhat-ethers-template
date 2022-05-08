import { deployments, ethers } from 'hardhat'
import { Greeter } from '../../typechain'

export const setupGreeter = deployments.createFixture(
	async ({ getNamedAccounts, getUnnamedAccounts }) => {
		await deployments.fixture(['Greeter'])

		const { deployer: deployerAddress } = await getNamedAccounts()
		const userAddresses = await getUnnamedAccounts()

		const Greeter = (await ethers.getContract('Greeter')) as Greeter
		const users = await Promise.all(
			userAddresses.map(async (userAddress) => {
				return {
					address: userAddress,
					Greeter: Greeter.connect(
						await ethers.getSigner(userAddress)
					),
				}
			})
		)

		return {
			deployer: {
				address: deployerAddress,
				Greeter,
			},
			users,
		}
	}
)
