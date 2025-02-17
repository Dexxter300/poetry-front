import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion } from "framer-motion";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import css from './pdf.module.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewer = ({ fileUrl }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [direction, setDirection] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const goToNextPage = () => {
        if (pageNumber < numPages) {
            setDirection(1);
            setPageNumber(pageNumber + 1);
        }
    };

    const goToPrevPage = () => {
        if (pageNumber > 1) {
            setDirection(-1);
            setPageNumber(pageNumber - 1);
        }
    };

    return (
        <div className="pdf-container">
            <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} className={css.pdf}>
                <motion.div
                    key={pageNumber}
                    initial={{ x: direction * 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -direction * 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <Page pageNumber={pageNumber} className={css.page} />
                </motion.div>
            </Document>

            <div className="controls">
                <button onClick={goToPrevPage} disabled={pageNumber === 1}>
                    Previous
                </button>
                <span>
                    Page {pageNumber} of {numPages}
                </span>
                <button onClick={goToNextPage} disabled={pageNumber === numPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default PDFViewer;
