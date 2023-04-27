import jsPDF from "jspdf";
import { DUMMY_DATA, EmojiDataURI, FontDataURL } from "../../data";

const writeDiary = async (doc, diaryEmotion, postDate, diaryImg, comment) => {
    // Define the page height and width
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;

    // Emotion을 삽입함.
    const topboxHeight = pageHeight * 0.02;
    const emotion = EmojiDataURI[diaryEmotion];
    const emotionSize = 40;
    doc.addImage(
        emotion,
        "JPEG",
        pageWidth * 0.05,
        topboxHeight,
        emotionSize,
        emotionSize
    );

    // 날짜를 삽입함.
    let text = `${postDate}`;
    let fontSize = 30;
    let textWidth =
        (doc.getStringUnitWidth(text) * fontSize) / doc.internal.scaleFactor;
    let X = (pageWidth * 0.95 - textWidth) / 2;
    let Y = topboxHeight + emotionSize * 0.7;

    doc.setFontSize(fontSize);
    doc.text(text, X, Y);

    // 요일을 삽입함.
    text = `${new Date(postDate).toLocaleDateString("ko-KR", {
        weekday: "short",
    })}`;
    fontSize = 20;
    textWidth =
        (doc.getStringUnitWidth(text) * fontSize) / doc.internal.scaleFactor;
    X = pageWidth * 0.95 - emotionSize;
    doc.setFontSize(fontSize);
    doc.text(text, X, Y);

    // 구분선을 삽입함.
    const lineLength = pageWidth * 0.9;
    const startX = (pageWidth - lineLength) / 2;
    const endX = startX + lineLength;
    const lineY = pageHeight * 0.03 + emotionSize;
    doc.setLineWidth(1);
    doc.setDrawColor(0, 0, 0);
    doc.line(startX, lineY, endX, lineY);

    // 이미지를 삽입함.

    const getImageSize = async (newImg) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = newImg;
            img.onload = function () {
                const { width, height } = this;
                resolve({
                    width,
                    height,
                });
            };
        });
    };
    const { width, height } = await getImageSize(diaryImg);
    console.log(width, height);
    const x = (pageWidth - width) / 2;
    const y = pageHeight * 0.1;
    doc.addImage(diaryImg, "JPEG", x, y, width, height);

    // 코멘트를 삽입함.
    text = comment;
    fontSize = 15;
    X = pageWidth * 0.05;
    Y = pageHeight * 0.7;
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, lineLength);
    for (const line of lines) {
        doc.text(line, X, Y);
        Y += fontSize * 1.2;
    }
};

export const generatePDF = async (data) => {
    // Create a new PDF instance
    const doc = new jsPDF({
        unit: "pt",
        format: "a4",
    });

    doc.addFileToVFS(
        "NanumSquareRoundB.ttf",
        FontDataURL["NanumSquareRoundB.ttf"]
    );
    doc.addFont("NanumSquareRoundB.ttf", "NanumSquareRoundB", "normal");
    doc.setFont("NanumSquareRoundB", "normal");

    for (const { emotion, postDate, contents } of data) {
        for (const { img, comment } of contents) {
            await writeDiary(doc, emotion, postDate, img, comment);
            doc.addPage();
        }
    }
    // 마지막 페에지를 지움
    doc.deletePage(doc.getNumberOfPages());
    // Save the PDF
    doc.save("example.pdf");
};
