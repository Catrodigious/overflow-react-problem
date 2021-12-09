import  React, { useState, useEffect } from "react";
import { getCampaigns } from "./services";

export default function CampaignSearch(){
    const [chosenCampaign, setChosenCampaign] = useState("");
    const [existingCampaigns, setExistingCampaigns] = useState([]);
    const [campaignMatch, setCampaignMatch] = useState([]);

    const loadCampaigns = () => {
      getCampaigns()
        .then((data) => {
          const names = data.map((campaign) => campaign.name);
          setExistingCampaigns(names);
        })
        .catch((err) => {
            console.error("An error occurred upon attempting to fetch campaigns: ", err);
        })
    }
    // loads campaigns upon first render
    useEffect(loadCampaigns, []);

    // when a match is found and is selected, set the chosen campaign to the selected choice
    const onMatchCampaign = (evt) => {
        const match = campaignMatch[evt.target.value];
        setChosenCampaign(match);
        setCampaignMatch([]);
    }

    // lists campaign matches based on input (dynamic)
    const onChooseCampaign = (evt) => {
      const name = evt.target.value;
      setChosenCampaign(name);
      setCampaignMatch([]);
  
      const campaignMatches = existingCampaigns.filter((campaign) => {
          if (campaign.includes(name) && name.length > 0){
              return campaign;
          }
      })
      // stores matches in a list to be displayed under the input element
      setCampaignMatch(campaignMatches);
    }

    return (
        <div className="campaignSearch">
        <p>What campaign would you like to support?</p>
        <form>
            <div>
                <input type="text" id="campaignInput" placeholder="Campaign" onChange={onChooseCampaign} value={chosenCampaign} />
                <ul>
                    { campaignMatch.length > 0 && 
                        campaignMatch.map((campaign, index) => <li key={index} onClick={onMatchCampaign}>{campaign}</li>)
                    }
                </ul>
            </div>
            <div>
                <button type="button">Back</button>
                { /* only displays the 'next' button if the chosen campaign exists */ }
                { existingCampaigns.includes(chosenCampaign) && 
                    <button type="submit">Next</button> }
          </div>
        </form>
      </div>
    )
}