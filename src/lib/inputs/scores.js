export const questions = [
	{
		category: 'credibility',
        label: 'Credibility',
		questions: [
			{
				column: 'attribution_financial_incentive',
				label:
					'The source of the attribution does not have a direct financial interest in a certain attribution outcome.'
			},
			{
				column: 'attribution_financial_transparency',
				label: 'The source of the attribution has a diversified and transparent funding stream.'
			},
			{
				column: 'attribution_endorse_political',
				label:
					'The source of the attribution does not strongly endorse a specific political ideology.'
			},
			{
				column: 'attribution_campaign_affiliation',
				label: 'The source of the attribution is in no way affiliated with a political campaign.'
			},
			{
				column: 'attribution_published_mis_disinfo',
				label: 'The source of the attribution has not previously promoted mis- or disinformation.'
			}
		]
	},
	{
		category: 'objectivity',
        label: 'Objectivity',
		questions: [
			{
				column: 'attribution_language',
				label: 'The attribution avoids using biased wording. The attribution avoids high-inference or emotive language.'
			},
			{
				column: 'attribution_convey_content',
				label: 'The headline accurately conveys the content of the attribution.'
			},
			{
				column: 'attribution_factual_argument',
				label: 'The attribution clearly distinguishes factual information from argumentative analysis.'
			}
		]
	},
    {
		category: 'evidence',
        label: 'Evidence',
		questions: [
			{
				column: 'attribution_clarity',
				label: 'The attribution provides a clear illustration of the methods, tactics, and platforms involved in the alleged information operation.'
			},
			{
				column: 'attribution_context',
				label: 'The attribution contextualizes the engagement with, and impact of, the alleged information operation.'
			},
			{
				column: 'attribution_identified_responsibility',
				label: 'The attribution identifies actors and states allegedly responsible.'
			},
			{
				column: 'attribution_strategic_rationale',
				label: 'The attribution clearly explains the strategic goal and rationale of the actors who conducted the alleged information operation.'
			},
			{
				column: 'attribution_privileged_evidence',
				label: 'The attribution relies on information which is unique to, or can only be procured by, the relevant actor. (e.g. classified information for U.S. federal agencies, back-end/developer information for technology companies)'
			}
		]
	},
    {
		category: 'transparency',
        label: 'Transparency',
		questions: [
			{
				column: 'attribution_open_access',
				label: 'The attribution provides open access to a dataset or archived links of alleged assets.'
			},
			{
				column: 'attribution_methodology',
				label: 'The attribution methodology is clearly explained.'
			},
			{
				column: 'attribution_open_source',
				label: 'The attribution is replicable through open-source evidence.'
			},
			{
				column: 'attribution_acknowledge_limitations',
				label: 'The attribution acknowledges relevant limitations or mitigating factors in its assessment.'
			},
			{
				column: 'attribution_corroboration',
				label: 'The attribution has been corroborated by a third party or independent investigation.'
			}
		]
	}
];
