const IMAGE_SOURCES = {
  "agriculture/01-contact-and-admissions.jpg": "https://gcdn.picsart.com/picsart-mcp/5cd0ea36-bfa5-42b2-b83b-cce92abc8f84.jpeg",
  "agriculture/02-crop-management-department.jpg": "https://gcdn.picsart.com/picsart-mcp/0ad4b96a-fbad-4997-87b2-fc84bcbee2bc.jpeg",
  "agriculture/03-about-and-leadership.jpg": "https://gcdn.picsart.com/picsart-mcp/c32aefd8-c355-4a70-81aa-315f70d4cc47.jpeg",
  "agriculture/04-educational-tours-and-field-visits.jpg": "https://gcdn.picsart.com/picsart-mcp/20c900c3-de40-4796-9621-0e14e00a2bf0.jpeg",
  "agriculture/05-bsc-hons-agriculture-programme.jpg": "https://gcdn.picsart.com/picsart-mcp/1e7c174c-d863-4b40-b1f6-60b7f6079724.jpeg",
  "agriculture/06-college-homepage.jpg": "https://gcdn.picsart.com/picsart-mcp/a0a0edc8-f9e2-41ed-a8fb-4f65caadd099.jpeg",
  "arts-science/01-academic-research-and-development.jpg": "https://gcdn.picsart.com/picsart-mcp/d40145e5-a0f8-4e55-b447-02db032c94c6.jpeg",
  "arts-science/02-contact-and-admissions.jpg": "https://gcdn.picsart.com/picsart-mcp/4f78d858-5ce2-4c49-9f30-897508cb15b9.jpeg",
  "arts-science/03-about-and-leadership.jpg": "https://gcdn.picsart.com/picsart-mcp/c53153c0-182e-42d9-b259-fddc1409f883.jpeg",
  "arts-science/04-college-homepage.jpg": "https://gcdn.picsart.com/picsart-mcp/0a6fa9ef-ac5d-41b6-819a-d7794ffac41c.jpeg",
  "arts-science/05-undergraduate-programmes.jpg": "https://gcdn.picsart.com/picsart-mcp/072a1a53-9afd-4bae-b02c-be4c446c68c7.jpeg",
  "catering/01-about-and-institution-overview.jpg": "https://gcdn.picsart.com/picsart-mcp/0d91d7e8-9abd-470f-920c-f691ffae0418.jpeg",
  "catering/02-hotel-management-diploma.jpg": "https://gcdn.picsart.com/picsart-mcp/ccf2cf91-c83d-45e2-b563-4da72b266ce4.jpeg",
  "catering/03-contact-and-admissions.jpg": "https://gcdn.picsart.com/picsart-mcp/c31b5e4c-b44b-4c7d-a404-8338f3bc191b.jpeg",
  "catering/04-catering-college-homepage.jpg": "https://gcdn.picsart.com/picsart-mcp/6c91d2ff-17b5-4072-98a3-ad4a8b7f9420.jpeg",
  "education/01-college-homepage.jpg": "https://gcdn.picsart.com/picsart-mcp/5fa2261b-911e-45d5-b62d-a7758b3e8aa8.jpeg",
  "education/02-about-us-and-leadership.jpg": "https://gcdn.picsart.com/picsart-mcp/3de0e933-a3ab-464d-a8f5-c4a676a023ac.jpeg",
  "education/03-b-ed-programme.jpg": "https://gcdn.picsart.com/picsart-mcp/c6c8d9ec-1357-4a62-ae1b-6dbbc21bdb3c.jpeg",
  "education/04-contact-and-admissions.jpg": "https://gcdn.picsart.com/picsart-mcp/2db2255d-6a9e-4512-bb85-62086a40c813.jpeg",
  "engineering/01-homepage.jpg": "https://gcdn.picsart.com/picsart-mcp/a3c217be-4b56-4169-9f8e-6f3c4bd82ec2.jpeg",
  "engineering/02-bachelor-of-engineering.jpg": "https://gcdn.picsart.com/picsart-mcp/65fc0b02-c06c-452d-975c-0295b3b9eff5.jpeg",
  "engineering/03-contact.jpg": "https://gcdn.picsart.com/picsart-mcp/5729c2ca-6fdf-4b9c-b226-611dcd9dc95e.jpeg",
  "engineering/04-aicte-accreditation.jpg": "https://gcdn.picsart.com/picsart-mcp/5d557fe2-5cb9-4273-bc40-453f5e051275.jpeg",
  "engineering/05-departments.jpg": "https://gcdn.picsart.com/picsart-mcp/a70f27cd-2bf9-443f-b0dd-4c87cda1dac7.jpeg",
  "engineering/06-institution-overview.jpg": "https://gcdn.picsart.com/picsart-mcp/36cc2391-6166-414c-a1af-3e0b28618657.jpeg",
  "physical-education/01-homepage.jpg": "https://gcdn.picsart.com/picsart-mcp/7d978010-31b1-4ca7-bc09-aec12b6afcea.jpeg",
  "physical-education/02-about-us-and-leadership.jpg": "https://gcdn.picsart.com/picsart-mcp/b4569bc5-5906-4f86-856a-2ec778d5b986.jpeg",
  "physical-education/03-bpes-programme.jpg": "https://gcdn.picsart.com/picsart-mcp/3ef51133-bfd5-433a-a506-296707a94f72.jpeg",
  "physical-education/04-contact-us.jpg": "https://gcdn.picsart.com/picsart-mcp/c5fdd56d-8826-432b-8545-210a2f697de7.jpeg",
  "polytechnic/01-contact-and-admissions.jpg": "https://gcdn.picsart.com/picsart-mcp/70b6d0ba-36e2-4c7b-a229-9da7fcf32ff1.jpeg",
  "polytechnic/02-campus-life.jpg": "https://gcdn.picsart.com/picsart-mcp/d9a64094-013f-4a79-a1be-378c8cf03a98.jpeg",
  "polytechnic/03-academics.jpg": "https://gcdn.picsart.com/picsart-mcp/e23dd0e5-8d1f-4fd9-bd80-a0e3cf6965fc.jpeg",
  "polytechnic/04-institution-overview.jpg": "https://gcdn.picsart.com/picsart-mcp/edcf6287-756a-47c0-9ffd-cc150dae3a9e.jpeg",
  "polytechnic/05-facilities.jpg": "https://gcdn.picsart.com/picsart-mcp/39b01a50-728c-4d3f-9bf5-5c42470dc92b.jpeg",
  "polytechnic/06-homepage.jpg": "https://gcdn.picsart.com/picsart-mcp/2034c74a-c6ab-450b-ac1a-124497b15ac9.jpeg",
  "school/01-contact-and-admissions.jpg": "https://gcdn.picsart.com/picsart-mcp/9a5513ac-97c4-4b35-8969-3358a11f761a.jpeg",
  "school/02-academics.jpg": "https://gcdn.picsart.com/picsart-mcp/e797200b-a295-4682-a005-b3e4147840c1.jpeg",
  "school/03-about-and-leadership.jpg": "https://gcdn.picsart.com/picsart-mcp/6d7a2602-737c-4709-ae1c-f75363bc1d0c.jpeg",
  "school/04-school-homepage.jpg": "https://gcdn.picsart.com/picsart-mcp/46d27adf-5e1e-4b8c-b3ed-ac183fcb9ff0.jpeg"
};

module.exports = async function handler(req, res) {
  const key = typeof req.query.file === "string" ? req.query.file : "";
  const source = IMAGE_SOURCES[key];
  if (!source) {
    res.status(404).setHeader("Cache-Control", "no-store");
    return res.end("Image not found");
  }
  try {
    const proxy = "https://images.weserv.nl/?url=" + encodeURIComponent(source) + "&output=jpg";
    const upstream = await fetch(proxy, { headers: { "User-Agent": "Mozilla/5.0", "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8" } });
    if (!upstream.ok) {
      res.status(502).setHeader("Cache-Control", "no-store");
      return res.end("Image source unavailable");
    }
    const type = upstream.headers.get("content-type") || "image/jpeg";
    const bytes = Buffer.from(await upstream.arrayBuffer());
    res.setHeader("Content-Type", type);
    res.setHeader("Content-Length", String(bytes.length));
    res.setHeader("Cache-Control", "public, max-age=31536000, s-maxage=31536000, immutable");
    res.setHeader("X-Content-Type-Options", "nosniff");
    return res.status(200).end(bytes);
  } catch (error) {
    res.status(502).setHeader("Cache-Control", "no-store");
    return res.end("Unable to load image");
  }
};
