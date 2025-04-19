'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import InfoIcon from './../../../components/ICard/ICard'


interface Report {
  _id: string;
  userId: string;
  ticker: string;
  logoURL: string;
  description: string;
  notes: string;
  createdAt?: string;
  summary?: string;
}


// added interface for stock data (FMP api)
interface StockData {
  price: number;
  marketCap: number;
  companyName: string;
  beta: number;
  volume: number;
  change: number;

  range: number;
  dividend: number;

  sector: string;

  city: string;
  state: string;

  dcf: number; // use to calculate if stock is overvalued or not
}


const ReportPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [stockData, setStockData] = useState<StockData | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await fetch(`/api/report/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch report');
        }
        const data = await res.json();
        setReport(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        router.push('/dashboard'); // fallback
      }
    };

    fetchReport();
  }, [id, router]);

  // added fetch for FMP api - stock data
  useEffect(() => {
    const fetchStockData = async () => {
      if (!report) return;

      try {
        const res = await fetch(`https://financialmodelingprep.com/api/v3/profile/${report.ticker}?apikey=2Hey2f7sBndBUkPFmYt5FFNchnjCoHMo`);
        if (!res.ok) {
          throw new Error('Failed to fetch report (stock data)');
        }
        const data = await res.json();
        const companyProfile = data[0];

        setStockData({
          price: companyProfile.price,
          marketCap: companyProfile.mktCap,
          companyName: companyProfile.companyName,
          beta: companyProfile.beta,
          volume: companyProfile.volAvg,
          change: companyProfile.changes,

          range: companyProfile.range,
          dividend: companyProfile.lastDiv,
          sector: companyProfile.sector,
          city: companyProfile.city,
          state: companyProfile.state,
          dcf: companyProfile.dcf
        });
      } catch (error) {
        console.error("stock data: ", error);
      }
    };

    fetchStockData();

  }, [report]);

  if (loading) return <p>Loading report...</p>;
  if (!report) return <p>Report not found.</p>;

  return (
    <div className="report-page">
      <h1>Report for <strong>{stockData?.companyName}</strong>({report.ticker})</h1>
      <div className="report-card">
        <div className="report-logo">
          <Image src={report.logoURL} alt={report.ticker} width={100} height={100} />
        </div>

        <br></br>

        <p><strong>Description:</strong> {report.description}</p>
        <p><strong>Notes:</strong> {report.notes}</p>

        {report.summary && (
          <div className="summary-section">
            <h2>Summary</h2>

            {/* Extract and render the intro line separately */}
            {(() => {
              const lines = report.summary.split('\n').filter(Boolean);
              const intro = lines[0];
              const points = report.summary.split(/\n\d+\.\s/).slice(1);

              return (
                <>
                  <p style={{ marginBottom: '1rem' }}>{intro}</p>
                  {points.map((point, i) => {
                    const infoMatch = point.match(/\[INFO:(.+?)\]/);
                    const infoText = infoMatch?.[1]?.trim();
                    const mainText = point.replace(/\[INFO:.+?\]/, '').trim();

                    return (
                      <div key={i} style={{ marginBottom: '1rem' }}>
                        <strong>{i + 1}.</strong> {mainText}{' '}
                        {infoText && <InfoIcon text={infoText} />}
                      </div>
                    );
                  })}
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportPage;
