// import fs from 'fs'
import { PassThrough } from 'stream';
import PDFDocument from 'pdfkit';
import path from 'path';

interface orderTypes{
    name:string,
    phoneNo:string,
    email:string,
    place:string,
    ordersData:orderDataTypes[],
    totalAmount:number,
    formatedDate:string,
}

interface orderDataTypes {
    title:string,
    quantity:number,
    unitPrice:number,
    totalPrice:number,
}



function createInvoice(order: orderTypes): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ size: "A4", margin: 50 });
        const buffers: Buffer[] = [];
        const stream = new PassThrough();

        // Collect data into buffers
        stream.on('data', (chunk) => buffers.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(buffers)));
        stream.on('error', (err) => reject(err));

        doc.pipe(stream);

        //absolute path
        const imagePath = path.join(__dirname, '../../assets/invoicebg.png');
        doc.image(imagePath, 0, 0, { width: 595, height: 842 });

        generateOrderInformation(doc, order);
        generateOrderTable(doc, order.ordersData);
        generateFooter(doc, order);

        doc.end();
    });
}

  function generateOrderInformation(doc:PDFKit.PDFDocument, order:orderTypes) {
    // Start 5rem (80px) from top
    const startY = 100;
    
    // Auto Generated Invoice heading
    doc
      .fillColor("#000000")
      .fontSize(12)
      .font('Helvetica')
      .text("Auto Generated Invoice", 50, startY, {
        align: 'center',
        width: 500
      });
  
    // Customer details
    const detailsStartY = startY + 40;
    const labelX = 50;
    const valueX = 100;
    const lineHeight = 16;
  
    // Name
    doc
      .font('Helvetica-Bold')
      .text("Name :", labelX, detailsStartY)
      .font('Helvetica')
      .text(order.name, valueX, detailsStartY);
  
    // Phone
    doc
      .font('Helvetica-Bold')
      .text("Phone :", labelX, detailsStartY + lineHeight)
      .font('Helvetica')
      .text(order.phoneNo, valueX, detailsStartY + lineHeight);
  
    // Email
    doc
      .font('Helvetica-Bold')
      .text("Email :", labelX, detailsStartY + lineHeight * 2)
      .font('Helvetica')
      .text(order.email, valueX, detailsStartY + lineHeight * 2);
  
    // Place
    doc
      .font('Helvetica-Bold')
      .text("Place :", labelX, detailsStartY + lineHeight * 3)
      .font('Helvetica')
      .text(order.place, valueX, detailsStartY + lineHeight * 3);
  }

  function generateOrderTable(doc:PDFKit.PDFDocument, ordersData:orderDataTypes[]) {
    let startY = 250; // Adjusted to start after order information
  
    // Order Details header
    doc
      .font('Helvetica-Bold')
      .fontSize(12)
      .text("Order Details", 50, startY)
      .moveDown();
  
    startY += 20;
  
    // Table Headers
    doc
      .fontSize(11)
      .text("Item", 50, startY)
      .text("Qty", 300, startY)
      .text("Unit Price", 400, startY)
      .text("Total", 500, startY);
  
    startY += 20;
  
    // Draw Line Below Header
    doc.moveTo(50, startY).lineTo(550, startY).stroke();
  
    startY += 10;
  
    // Table Content
    doc.font('Helvetica');
    ordersData.forEach((item) => {
      doc
        .fontSize(10)
        .text(item.title, 50, startY)
        .text(item.quantity.toString(), 300, startY)
        .text(`Rs. ${item.unitPrice}`, 400, startY)
        .text(`Rs. ${item.totalPrice}`, 500, startY);
      startY += 20;
    });
  
    // Draw Line Below Table
    doc.moveTo(50, startY).lineTo(550, startY).stroke();
  }
  
  function generateFooter(doc:PDFKit.PDFDocument, order:orderTypes) {
    const footerY = 450;
    
    // Total Amount
    doc
      .font('Helvetica-Bold')
      .fontSize(12)
      .text("Total Amount:", 50, footerY)
      .font('Helvetica')
      .text(`Rs. ${order.totalAmount}`, 150, footerY);
  
    // Delivery Date
    doc
      .font('Helvetica-Bold')
      .text("Delivery Date:", 50, footerY + 25)
      .font('Helvetica')
      .text(order.formatedDate, 150, footerY + 25);
  }
  

export {createInvoice};

