import React, { useEffect } from "react"
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

import "../styles/PowerBI.css";

function PowerBI(props) {
    const { refPBI, width, pageNavigation, accessToken, API_DEFAULT, WORKSPACE_ID, REPORT_ID, setShowBackdrop } = props;
    const [pbiEmbed, setPbiEmbed] = props.pbi;

    async function fetchPBIEmbedService() {
        setShowBackdrop(true);
        const res = await fetch(`${API_DEFAULT}/pbi_auth/pbi_embed_token?workspace_id=${WORKSPACE_ID}&report_id=${REPORT_ID}`, {
            headers: { "Content-Type": "application/json", "Authorization": "Token " + accessToken }
        });
        res
            .json()
            .then(res => { setPbiEmbed(res); setShowBackdrop(false) })
    }

    useEffect(() => {
        fetchPBIEmbedService() // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [REPORT_ID]);

    return (
        <div ref={refPBI} className="PowerBI-body" style={{ height: (86 / 153) * width + 5686 / 153 }}>
            {pbiEmbed["accessToken"] !== undefined ?
                <PowerBIEmbed
                    embedConfig={
                        {
                            type: "report", // Supported types: report, dashboard, tile, visual, and qna.
                            id: pbiEmbed["reportConfig"][0]["reportId"],
                            embedUrl: pbiEmbed["reportConfig"][0]["embedUrl"],
                            accessToken: pbiEmbed["accessToken"],
                            tokenType: models.TokenType.Embed, // Use models.TokenType.Aad if you"re embedding for your organization.
                            settings: {
                                panes: {
                                    filters: {
                                        expanded: false,
                                        visible: false
                                    },
                                    pageNavigation: {
                                        position: models.PageNavigationPosition.Bottom,
                                        visible: pageNavigation
                                    }
                                }
                            }
                        }
                    }
                    eventHandlers={
                        new Map([
                            ["loaded", function () {
                                console.log("Report loaded");
                            }],
                            ["rendered", function () {
                                console.log("Report rendered");
                            }],
                            ["error", function (event) {
                                console.log(event.detail);
                            }]
                        ])
                    }
                    cssClassName={
                        "report-style-class"
                    }
                    getEmbeddedComponent={
                        (embeddedReport) => {
                            window.report = embeddedReport;
                        }
                    }
                />
                :
                null
            }
        </div>
    );
}

export default PowerBI;