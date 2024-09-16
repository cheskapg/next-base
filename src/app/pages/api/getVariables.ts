// pages/api/getVariables.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export async function getVariables(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    behavioralKey: process.env.BEHAVIORAL_KEY || '',
    therapistKey: process.env.THERAPIST_KEY || '',
    workersCompKey: process.env.WORKERSCOMP_KEY || '',
    mercyApplicableRegions: process.env.MERCY_APPLICABLE_REGIONS || '',
  });
}

// Default export for API route handling
export default getVariables;
