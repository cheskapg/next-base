// pages/api/getVariables.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export async function getVariables(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    behavioralKey: process.env.BEHAVIORAL_KEY || '3',
    therapistKey: process.env.THERAPIST_KEY || '4',
    workersCompKey: process.env.WORKERSCOMP_KEY || '2',
    mercyApplicableRegions: process.env.MERCY_APPLICABLE_REGIONS || '5000,6000,7000,8000',
  });
}

// Default export for API route handling
export default getVariables;
