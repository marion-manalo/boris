'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import InfoIcon from '@/components/ICard/ICard';

interface Report {
  _id: string;
  userId: string;
  ticker: string;
  logoURL: string;
  description: string;
  notes: string;
  createdAt?: string;
  summary?: string;
  stockData?: {
    price: number;
    marketCap: number;
    companyName: string;
    beta: number;
    volume: number;
    change: number;
    range: string;
    dividend: number;
    sector: string;
    dcf: number;
  };
}

const ReportPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

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
        router.push('/dashboard');
      }
    };

    fetchReport();
  }, [id, router]);

  if (loading) return <p>Loading report...</p>;
  if (!report) return <p>Report not found.</p>;

  return (
    <div className="report-page">
      <h1>
        Report for <strong>{report.stockData?.companyName || report.ticker}</strong>
        {report.stockData?.companyName && ` (${report.ticker})`}
      </h1>

      <div className="report-card">
        <div className="report-logo">
          <Image src={report.logoURL} alt={report.ticker} width={100} height={100} />
        </div>

        <p><strong>Description:</strong> {report.description}</p>
        <p><strong>Notes:</strong> {report.notes}</p>

        {/* Summary Section */}
        {report.summary && (
          <div className="summary-section">
            <h2>Summary</h2>
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

        {/* Stock Data Section */}
        {report.stockData && (
          <div className="stock-section">
            <h2>Stock Details</h2>
            <ul>
              <li><strong>Price:</strong> ${report.stockData.price.toFixed(2)}</li>
              <li><strong>Market Cap:</strong> ${report.stockData.marketCap.toLocaleString()}</li>
              <li><strong>Beta:</strong> {report.stockData.beta}</li>
              <li><strong>Volume:</strong> {report.stockData.volume.toLocaleString()}</li>
              <li><strong>Change:</strong> {report.stockData.change.toFixed(2)}%</li>
              <li><strong>Range:</strong> {report.stockData.range}</li>
              <li><strong>Dividend:</strong> ${report.stockData.dividend}</li>
              <li><strong>Sector:</strong> {report.stockData.sector}</li>
              <li><strong>DCF (Discounted Cash Flow):</strong> ${report.stockData.dcf.toFixed(2)}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportPage;
