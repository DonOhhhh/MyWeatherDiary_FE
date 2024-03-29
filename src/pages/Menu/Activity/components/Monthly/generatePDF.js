import jsPDF from "jspdf";
import { EmojiDataURI, FontDataURL } from "../../data";

function resizeImageDataUri(dataUri, newWidth, newHeight) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = dataUri;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = newWidth;
            canvas.height = newHeight;

            // Fill the canvas with a white background
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, newWidth, newHeight);

            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            const resizedDataUri = canvas.toDataURL("image/jpeg", 1.0);
            resolve(resizedDataUri);
        };
    });
}

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

const writeDiary = async (
    doc,
    diaryEmotion,
    postDate,
    diaryImg,
    comment,
    contentsNum = null
) => {
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

    // contentsNum이 있으면 삽입함.
    if (contentsNum) {
        doc.setFontSize(20);
        doc.text(contentsNum, X + textWidth + 20, Y);
    }

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
    let lineY = pageHeight * 0.03 + emotionSize;
    doc.setLineWidth(1);
    doc.setDrawColor(0, 0, 0);
    doc.line(startX, lineY, endX, lineY);

    // 이미지의 넓이와 높이를 구함.
    const { width: imgWidth, height: imgHeight } = await getImageSize(diaryImg);

    const maxWidth = pageWidth * 0.9;
    const maxHeight = pageHeight * 0.6;

    const widthRatio = maxWidth / imgWidth;
    const heightRatio = maxHeight / imgHeight;

    const ratio = Math.min(widthRatio, heightRatio);

    // 영역에 맞춘 이미지의 새로운 넓이와 높이를 구함.
    const newWidth = imgWidth * ratio;
    const newHeight = imgHeight * ratio;

    const x = (pageWidth - newWidth) / 2;
    const y = pageHeight * 0.1 + (maxHeight - newHeight) / 2;

    if (diaryImg) {
        // 새로운 넓이와 높이에 맞게 이미지를 resize함.
        const resizedDataUri = await resizeImageDataUri(
            diaryImg,
            newWidth,
            newHeight
        );
        // console.log(resizeImageDataUri);

        // 이미지를 삽입함.
        doc.addImage(
            resizedDataUri,
            "JPEG",
            x,
            y,
            newWidth,
            newHeight,
            undefined,
            "FAST"
        );
    }

    // comment가 존재한다면
    if (comment) {
        // 구분선을 삽입함.
        if (diaryImg) {
            lineY = newHeight + y + 20;
            doc.line(startX, lineY, endX, lineY);
        }

        // 코멘트를 삽입함.
        text = comment;
        fontSize = 15;
        X = pageWidth * 0.05;
        Y = lineY + 40;
        doc.setFontSize(fontSize);
        const lineHeight = fontSize + 5;
        const lines = doc.splitTextToSize(text, lineLength);
        let i = 0;
        for (const line of lines) {
            doc.text(line, X, Y + lineHeight * i);
            Y += fontSize * 1.2;
        }
    }
};

export const generatePDF = async (data) => {
    // console.log(data);
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
        let i = 0;
        for (const { img, comment } of contents) {
            await writeDiary(
                doc,
                emotion,
                postDate,
                img,
                comment,
                `(${i + 1} / ${contents.length})`
            );
            doc.addPage();
            i++;
        }
    }
    // 마지막 페이지를 지움
    doc.deletePage(doc.getNumberOfPages());
    // Save the PDF
    doc.save(`${new Date().toLocaleString()}.pdf`);
};
