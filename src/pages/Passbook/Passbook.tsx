import React, { useState } from 'react';
import './Passbook.scss';

interface PageProps {
	content: string;
}

const Page: React.FC<PageProps> = ({ content }) => {
	return (
		<div className="page">
			<p>{content}</p>
		</div>
	);
};

interface BookProps {
	pages: PageProps[];
}

const Passbook: React.FC<BookProps> = ({ pages }) => {
	const [currentPage, setCurrentPage] = useState(0);

	console.log('pages', pages);

	const handleNextPage = () => {
		if (currentPage === pages.length - 1) return;
		setCurrentPage(currentPage + 1);
	};

	const handlePrevPage = () => {
		if (currentPage === 0) return;
		setCurrentPage(currentPage - 1);
	};

	return (
		<div className="book">
			<div
				className="book-left-page"
				onClick={handlePrevPage}
				style={{ transform: `rotateY(${currentPage % 2 === 0 ? '0' : '-180'}deg)` }}>
				<Page content={pages[currentPage - 1]?.content || ''} />
			</div>
			<div
				className="book-right-page"
				onClick={handleNextPage}
				style={{ transform: `rotateY(${currentPage % 2 === 0 ? '180' : '0'}deg)` }}>
				<Page content={pages[currentPage]?.content || ''} />
			</div>
		</div>
	);
};

export default Passbook;
