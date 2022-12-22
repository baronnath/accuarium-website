import React from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import translator from '../translator/translator';
import trans from '../translator/translations/en';

const FAQ = () => {

  const i18n = translator();
  const totalQuestions = Object.keys(trans.faq.questions).length;
  let questions = [
    <Typography variant="h4" sx={{marginBottom: 3}}>{i18n.t(`faq.title`)}</Typography>
  ];

  for (let index = 0; index < totalQuestions; index++) {
    const n = index + 1;

    questions.push(
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${n}-content`}
          id={`panel${n}-header`}
        >
          <Typography>{i18n.t(`faq.questions.${n}.question`)}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{i18n.t(`faq.questions.${n}.answer`)}</Typography>
        </AccordionDetails>
      </Accordion>
    );
  }

  return questions;

}

export default FAQ;
