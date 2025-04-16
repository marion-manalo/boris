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
        router.push('/dashboard'); // fallback
      }
    };

    fetchReport();
  }, [id, router]);

  if (loading) return <p>Loading report...</p>;
  if (!report) return <p>Report not found.</p>;

  return (
    <div className="report-page">
      <h1>Report for {report.ticker}</h1>
      <div className="report-card">
        <div className="report-logo">
          <Image src={report.logoURL} alt={report.ticker} width={100} height={100} />
        </div>
        <p><strong>Description:</strong> {report.description}</p>
        <p><strong>Notes:</strong> {report.notes}</p>
        {report.summary && (
          <div>
            <h2>Summary</h2>
            <p>{report.summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportPage;
