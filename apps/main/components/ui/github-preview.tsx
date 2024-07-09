"use client"
import { Card } from '@foliofy/ui/card';
import Image from 'next/image';

// Optionally import the CSS
import 'react-calendar-heatmap/dist/styles.css';
import React from 'react';
import ReactCalendarHeatmap from 'react-calendar-heatmap';
import { addDays } from 'date-fns';
import { GitHubtype } from '@/types/ui/github';

const GithubPreview = ({ data }: { data: GitHubtype }) => {
    return (
        <Card id='github-preview' className={('p-6 break-inside-avoid flex flex-col dark:border-gray-800 rounded-xl shadow-xl dark:shadow-gray-800')}>
            <Image width={30} height={30} alt='favicons of urls' className='rounded-lg' src="/icons/socials/github.svg" />
            <div className='mt-3'>
                <ReactCalendarHeatmap
                    startDate={addDays(new Date(), -90)}
                    endDate={new Date()}
                    values={data.heatData ?? []}
                    classForValue={(value) => {
                        if (!value) {
                            return 'color-empty';
                        }
                        return `color-scale-${Math.min(value.count, 4)}`;
                    }}
                    titleForValue={(value) => value?.date ? `${value.date}: ${value.count} contributions` : 'No contributions'}
                    showMonthLabels
                    showWeekdayLabels
                    gutterSize={5}
                />
            </div>
        </Card>
    );
};

export default GithubPreview;
