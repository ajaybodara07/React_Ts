import React from 'react';
import { Typography } from '@material-ui/core';

export const talkingPoints: any = {
  '1. Bipartisan Relationship': {
    title: (
      <Typography variant="h4" component="h2">
        1. Strengthening the foundation: a strong US-Israel relationship as a
        bipartisan cause
      </Typography>
    ),
    text: (
      <Typography variant="body1" style={{ margin: 20 }}>
        The United States and Israel share fundamental common values and
        national interests. A strong US-Israel relationship enhances those
        values and interests and strengthens the United States.
      </Typography>
    )
  },
  '2. Security Assistance': {
    title: (
      <Typography variant="h4" component="h2">
        2. Supporting Security Assistance
      </Typography>
    ),
    text: (
      <Typography variant="body1" style={{ margin: 20 }}>
        Ask House & Senate to please support appropriation of $3.3 billion in
        U.S. security assistance to Israel and $500 million in cooperative
        missile defense funding for Fiscal Year 2020, as called for in the most
        recent Memorandum of Understanding (MOU).
      </Typography>
    )
  },
  '3. Anti-BDS': {
    title: (
      <div>
        <Typography variant="h4" component="h2">
          3. Combating the anti-Semitic BDS movement
          <br />
          <br />
        </Typography>
        <Typography variant="h6" component="h6">
          House: H. Res. 246 <br /> Senate: S. Res. 120
        </Typography>
      </div>
    ),
    text: (
      <Typography variant="body1" style={{ margin: 20 }}>
        Ask House & Senate to support their respective Resolutions opposing
        efforts to delegitimize the State of Israel and the Global Boycott,
        Divestment, and Sanctions Movement targeting Israel.
        <br />
        <br />
        In the House, Reps. Brad Schneider (D-IL), Lee Zeldin (R-NY), Jerry
        Nadler (D-NY) and Ann Wagner (R-MO) have introduced a bipartisan
        anti-BDS resolution (H.Res.246).
        <br />
        <br />
        In the Senate, a companion resolution (S.Res.120) has been introduced by
        Sens. Ben Cardin (D-MD) and Rob Portman (R-OH).
      </Typography>
    )
  },
  '4. JCPOA Fallout': {
    title: (
      <Typography variant="h4" component="h2">
        4. Reminder of Iran's behavious since the JCPOA
      </Typography>
    ),
    text: (
      <Typography variant="body1" style={{ margin: 20 }}>
        In deciding on the proper course of action with Iran, it is critical
        that the decision be informed by full awareness of Iran's continued and
        aggressive flouting of the norms of civilized behavior.
      </Typography>
    )
  },
  '5. Hamas Sanctions': {
    title: (
      <div>
        <Typography variant="h4" component="h2">
          5. Sanctions against Hamas
        </Typography>
        <br />
        <Typography variant="h6" component="h6">
          House: Palestinian International Terrorism Support Prevention Act
          (H.R. 1850)
        </Typography>
        <Typography variant="h6" component="h6">
          Senate: Support for a Senate counterpart to H.R. 1850
        </Typography>
      </div>
    ),
    text: (
      <Typography variant="body1" style={{ margin: 20 }}>
        Ask House to support the Palestinian International Terrorism Support
        Prevention Act (H.R. 1850) - authored by Reps. Brian Mast (R-FL) and
        Josh Gottheimer (D-NJ).
        <br />
        <br />
        Ask Senate to support a counterpart to H.R. 1850.
      </Typography>
    )
  },
  '6. Security & Economics': {
    title: (
      <div>
        <Typography variant="h4" component="h2">
          6. Enhancing U.S.-Israel Security & Economic Cooperation
        </Typography>
        <br />
        <Typography variant="h6" component="h6">
          House: U.S.-Israel Cooperation Enhancement & Regional Security Act
          (H.R.1837)
        </Typography>
        <Typography variant="h6" component="h6">
          Senate: Thank for S.1
        </Typography>
      </div>
    ),
    text: (
      <Typography variant="body1" style={{ margin: 20 }}>
        Ask House to support the U.S.-Israel Cooperation Enhancement & Regional
        Security Act (H.R.1837) authored by Reps. Reps. Deutch (D-FL) and Wilson
        (R-SC).
        <br />
        <br />
        Thank Senators who supported the Strenghtening America's Security in the
        Middle East Act (S.1).
      </Typography>
    )
  }
};

export const bills: any = {
  HRes246: talkingPoints['3. Anti-BDS'],
  SRes120: talkingPoints['3. Anti-BDS'],
  HR1850: talkingPoints['5. Hamas Sanctions'],
  HR1837: talkingPoints['6. Security & Economics'],
  S1: talkingPoints['6. Security & Economics']
};
