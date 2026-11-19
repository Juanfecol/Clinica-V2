const POST_OP_PDF_URL =
  'https://clinica-santa-maria-dos-olivais.b-cdn.net/CUIDADOS%20POS%20OPERATORIOS.pdf';
const DOWNLOAD_FILENAME =
  'Cuidados-Pos-Operatorios-Clinica-Santa-Maria-dos-Olivais.pdf';

interface VercelRequestLike {
  method?: string;
  query?: Record<string, string | string[] | undefined>;
}

interface VercelResponseLike {
  status: (code: number) => VercelResponseLike;
  setHeader: (name: string, value: string) => void;
  send: (body: Buffer | string) => void;
  redirect?: (statusOrUrl: number | string, url?: string) => void;
  end: () => void;
}

export default async function handler(
  _req: VercelRequestLike,
  res: VercelResponseLike
): Promise<void> {
  try {
    const upstream = await fetch(POST_OP_PDF_URL);
    if (!upstream.ok) {
      throw new Error(`Upstream status ${upstream.status}`);
    }

    const arrayBuffer = await upstream.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${DOWNLOAD_FILENAME}"`
    );
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    res.status(200).send(pdfBuffer);
  } catch {
    res.setHeader('Location', POST_OP_PDF_URL);
    res.status(302).end();
  }
}
