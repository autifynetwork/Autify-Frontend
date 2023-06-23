import React, { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';

const OrderStatusStats: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    // @ts-ignore
    useEffect(() => {
        const data = {
            labels: ['Lorem.', 'Lorem.', 'Lorem.', 'Lorem.'],
            datasets: [
                {
                    label: 'Order Status',
                    data: [280, 40, 50, 50],
                    backgroundColor: [
                        'rgb(246, 246, 246)',
                        'rgb(255, 87, 165)',
                        'rgb(121, 210, 222)',
                        'rgb(245, 227, 6)',
                    ],
                    hoverOffset: 4,
                },
            ],
        };

        const chartConfig: ChartConfiguration = {
            type: 'doughnut',
            data: data,
            options: {
                // @ts-ignore
                cutout: '80%',
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            boxHeight: 8,
                            boxWidth: 8,
                            padding: 16,
                            color: '#fff',
                        },
                    },
                },
                elements: {
                    arc: {
                        borderWidth: 4,
                        borderColor: '#3B76EF',
                        borderRadius: 16,
                    },
                },
                layout: {
                    padding: 1,
                },
            },
        };

        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                const chartInstance = new Chart(ctx, chartConfig);
                return () => {
                    chartInstance.destroy();
                };
            }
        }
    }, []);

    return <canvas ref={chartRef} style={{ width: '100px' }} />;
};

export default OrderStatusStats;
