'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Image from 'next/image';


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

        <br></br>

        {/* add stock data from FMP api */}

        {stockData && (
          <div className="stock-info">
            <h2 className="text-2xl font-bold mb-4">Stock Information</h2>

            <div className="flex items-center space-x-4">
              <p className="text-3xl font-semibold">${stockData.price.toFixed(2)}</p>

              {/* calculate price change and color accordingly */}
              <div className={`text-lg font-medium ${stockData.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {stockData.change >= 0 ? '+' : ''}
                {stockData.change.toFixed(2)} (
                {((stockData.change / (stockData.price - stockData.change)) * 100).toFixed(2)}%
                )
              </div>
            </div>

            <p><strong>Market Cap:</strong> {(stockData.marketCap / 1000000000).toFixed(2)}B</p>
            <p><strong>Beta:</strong> {(stockData.beta.toFixed(2))}</p>
            <p><strong>Average Volume:</strong> {stockData.volume}</p>
            <p><strong>52 Week Range:</strong> {stockData.range}</p>
            <p><strong>Recent Div/Share:</strong> {stockData.dividend}</p>
            <p><strong>Sector:</strong> {stockData.sector}</p>
            <p><strong>Location:</strong> {stockData.city}, {stockData.state}</p>
            <p><strong>DCF Pricing:</strong> {stockData.dcf.toFixed(2)}</p>

          </div>
        )}

        {report.summary && (
          <div>
            <br></br>
            <h2><strong>Summary</strong></h2>
            <p>{report.summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportPage;
