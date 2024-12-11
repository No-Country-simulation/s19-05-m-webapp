import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const useBillDownload = (fileName) => {
    const elementRef = useRef(null);

    const downloadPDF = async () => {
        const content = elementRef.current;

        if (content) {
            const textElements = [
                ...content.querySelectorAll("h1, h2, p, th, td")
            ];

            const originalColors = textElements.map((el) => el.style.color);
            
            textElements.forEach((el) => {
                el.style.color = "black";
            });

            const canvas = await html2canvas(content, {
                backgroundColor: "#ffffff",  
                scale: 2,                    
            });
            
            textElements.forEach((el, index) => {
                el.style.color = originalColors[index];
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "PNG", 10, 10, 120, 150);
            pdf.save(`${fileName}.pdf`);
        }
    };

    return { elementRef, downloadPDF };
};

export default useBillDownload;
