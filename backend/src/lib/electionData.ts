import fs from 'fs';
import path from 'path';

interface Candidate {
  name: string;
  party: string;
  votes: number;
  percent: number;
}

interface Constituency {
  state: string;
  winner: Candidate;
  runner_up: Candidate | null;
  total_candidates: number;
}

interface ElectionKnowledge {
  summary: {
    total_constituencies: number;
    total_candidates: number;
    parties: string[];
  };
  constituencies: Record<string, Constituency>;
}

let knowledgeBase: ElectionKnowledge | null = null;

export function getElectionKnowledge(): ElectionKnowledge | null {
  if (knowledgeBase) return knowledgeBase;

  const dataPath = path.join(process.cwd(), 'data', 'election_knowledge.json');
  if (fs.existsSync(dataPath)) {
    try {
      const rawData = fs.readFileSync(dataPath, 'utf-8');
      knowledgeBase = JSON.parse(rawData);
      return knowledgeBase;
    } catch (error) {
      console.error('Error reading election knowledge:', error);
    }
  }
  return null;
}

export function searchConstituency(query: string): string {
  const kb = getElectionKnowledge();
  if (!kb) return '';

  const normalizedQuery = query.toLowerCase();
  
  // Find matching constituencies by checking if the constituency name (or part of it)
  // is mentioned in the query, or vice-versa.
  const matches = Object.keys(kb.constituencies).filter(name => {
    const normalizedName = name.toLowerCase();
    // Split "Varanasi - 77" to just "Varanasi" for better matching
    const simpleName = normalizedName.split(' - ')[0];
    
    return normalizedQuery.includes(simpleName) || 
           normalizedQuery.includes(normalizedName) ||
           normalizedName.includes(normalizedQuery);
  });

  if (matches.length === 0) return '';

  // Return data for the top matches (limit to 3 to keep context clean)
  return matches.slice(0, 3).map(name => {
    const data = kb.constituencies[name];
    let info = `Constituency: ${name} (${data.state})\n`;
    info += `- Winner: ${data.winner.name} (${data.winner.party}) with ${data.winner.votes.toLocaleString()} votes (${data.winner.percent}%)\n`;
    if (data.runner_up) {
      info += `- Runner-up: ${data.runner_up.name} (${data.runner_up.party}) with ${data.runner_up.votes.toLocaleString()} votes (${data.runner_up.percent}%)\n`;
    }
    return info;
  }).join('\n');
}
