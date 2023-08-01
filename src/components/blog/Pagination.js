import React from 'react';
import { Link } from "react-router-dom";
import { createPaginationArray } from "../../helpers/blog";
import { default as Paginator } from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {

	console.log(currentPage, totalPages)

	const handleChange = ( e, page ) => {
		setCurrentPage(page);
	};

	return (
		<Stack alignItems="center">
			<Paginator
				count={totalPages >= 5 ? 5 : totalPages}
				page={currentPage}
				onChange={(e, page) => handleChange(e, page)}
			 	color="primary"
			 	sx={{ marginTop:5, alignItems: 'center', justifyContent: 'center', textAlign: 'center', alignSelf: 'center' }}
			/>
		</Stack>
	)
};

export default Pagination;