import { DeployFunction } from 'hardhat-deploy/dist/types'

const func: DeployFunction = async (hre) => {
	const { deployments, getNamedAccounts } = hre
	const { deploy } = deployments

	const { deployer } = await getNamedAccounts()

	await deploy('Greeter', { from: deployer, args: ['Hello, world!'] })
}

export default func
func.tags = ['Greeter']
