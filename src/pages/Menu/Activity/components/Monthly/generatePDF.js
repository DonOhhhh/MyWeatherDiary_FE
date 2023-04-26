import jsPDF from "jspdf";

export const generatePDF = (dummy_data) => {
    // Create a new PDF instance
    const pdf = new jsPDF();

    // Define the page height and width
    const pageHeight = pdf.internal.pageSize.height;
    const pageWidth = pdf.internal.pageSize.width;

    // create an array of data for each PDF
    const data = [
        {
            title: "PDF 1",
            image: "https://via.placeholder.com/150",
            body: "Page 1 Body Content",
        },
        {
            title: "PDF 2",
            image: "https://via.placeholder.com/150",
            body: "Page 2 Body Content",
        },
        {
            title: "PDF 3",
            image: "https://via.placeholder.com/150",
            body: "Page 3 Body Content",
        },
    ];
    // Loop through each page and add content
    for (let i = 0; i < 3; i++) {
        // Add a new page
        pdf.addPage();

        // Define the linear gradient background for the title
        const titleGradient = pdf.linearGradient(0, 0, pageWidth, 0);
        titleGradient.addColorStop(0, "#00FF00");
        titleGradient.addColorStop(1, "#FFFFFF");

        // Define the linear gradient background for the body
        const bodyGradient = pdf.linearGradient(0, 0, pageWidth, 0);
        bodyGradient.addColorStop(0, "#FFFFFF");
        bodyGradient.addColorStop(1, "#00FF00");

        // Add the title content with the gradient background
        pdf.setFillColor(titleGradient);
        pdf.roundedRect(10, 10, pageWidth - 20, 50, 15, 15, "F");
        pdf.setTextColor("#000000");
        pdf.setFontSize(18);
        pdf.text(data[i], 20, 35);

        // Add the image content
        pdf.addImage(data[i], "JPEG", 20, 70, 100, 100);

        // Add the body content with the gradient background
        pdf.setFillColor(bodyGradient);
        pdf.roundedRect(10, 180, pageWidth - 20, pageHeight - 200, 15, 15, "F");
        pdf.setTextColor("#000000");
        pdf.setFontSize(14);
        pdf.text(data[i], 20, 200);

        // Move to the next page
        pdf.nextPage();
    }

    // Save the PDF
    pdf.save("example.pdf");
};
