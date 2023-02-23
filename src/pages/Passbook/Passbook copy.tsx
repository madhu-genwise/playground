import React, { useState } from 'react';
import './Passbook.scss';

interface Transaction {
	date: string;
	description: string;
	debit: number;
	credit: number;
	balance: number;
}

const transactions: Transaction[] = [
	{
		date: '01/01/2022',
		description: 'Opening balance',
		debit: 0,
		credit: 10000,
		balance: 10000,
	},
	{
		date: '05/01/2022',
		description: 'Salary credit',
		debit: 0,
		credit: 5000,
		balance: 15000,
	},
	{
		date: '10/01/2022',
		description: 'Electricity bill payment',
		debit: 1000,
		credit: 0,
		balance: 14000,
	},
	{
		date: '15/01/2022',
		description: 'Grocery shopping',
		debit: 2000,
		credit: 0,
		balance: 12000,
	},
	{
		date: '01/01/2022',
		description: 'Opening balance',
		debit: 0,
		credit: 10000,
		balance: 10000,
	},
	{
		date: '05/01/2022',
		description: 'Salary credit',
		debit: 0,
		credit: 5000,
		balance: 15000,
	},
	{
		date: '10/01/2022',
		description: 'Electricity bill payment',
		debit: 1000,
		credit: 0,
		balance: 14000,
	},
	{
		date: '15/01/2022',
		description: 'Grocery shopping',
		debit: 2000,
		credit: 0,
		balance: 12000,
	},
	{
		date: '01/01/2022',
		description: 'Opening balance',
		debit: 0,
		credit: 10000,
		balance: 10000,
	},
	{
		date: '05/01/2022',
		description: 'Salary credit',
		debit: 0,
		credit: 5000,
		balance: 15000,
	},
	{
		date: '10/01/2022',
		description: 'Electricity bill payment',
		debit: 1000,
		credit: 0,
		balance: 14000,
	},
	{
		date: '15/01/2022',
		description: 'Grocery shopping',
		debit: 2000,
		credit: 0,
		balance: 12000,
	},
];

const Passbook = () => {
	const [currentPage, setCurrentPage] = useState(0);

	const handlePrevClick = () => {
		setCurrentPage(currentPage - 1);
	};

	const handleNextClick = () => {
		setCurrentPage(currentPage + 1);
	};

	return (
		<div className="passbook">
			<div className="passbook-header">Bank Passbook</div>
			<div className="passbook-content">
				<div className="passbook-page">
					<div className="passbook-transactions">
						{transactions.slice(currentPage * 5, currentPage * 5 + 5).map((transaction, index) => (
							<div key={index} className="passbook-transaction">
								<div className="passbook-transaction-date">{transaction.date}</div>
								<div className="passbook-transaction-description">{transaction.description}</div>
								<div className="passbook-transaction-debit">{transaction.debit}</div>
								<div className="passbook-transaction-credit">{transaction.credit}</div>
								<div className="passbook-transaction-balance">{transaction.balance}</div>
							</div>
						))}
					</div>
				</div>
				<div className="passbook-page">
					<div className="passbook-transactions">
						{transactions.slice(currentPage * 5 + 5, currentPage * 5 + 10).map((transaction, index) => (
							<div key={index} className="passbook-transaction">
								<div className="passbook-transaction-date">{transaction.date}</div>
								<div className="passbook-transaction-description">{transaction.description}</div>
								<div className="passbook-transaction-debit">{transaction.debit}</div>
								<div className="passbook-transaction-credit">{transaction.credit}</div>
								<div className="passbook-transaction-balance">{transaction.balance}</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="passbook-footer">
				{currentPage > 0 && <button onClick={handlePrevClick}>Prev</button>}
				{currentPage < Math.ceil(transactions.length / 5) - 1 && <button onClick={handleNextClick}>Next</button>}
			</div>
		</div>
	);
};

export default Passbook;
