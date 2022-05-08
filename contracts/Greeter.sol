//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';

contract Greeter is Ownable {
	string private greeting;
	event SetGreeting(string _greeting);

	constructor(string memory _greeting) {
		greeting = _greeting;
	}

	function greet() external view returns (string memory) {
		return greeting;
	}

	function setGreeting(string memory _greeting) external onlyOwner {
		greeting = _greeting;
		emit SetGreeting(greeting);
	}
}
