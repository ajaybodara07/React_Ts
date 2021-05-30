import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Card, CardContent, Typography } from '@material-ui/core';
import { styles } from './styles';
import withRoot from '../../withRoot';

interface ITalkingPointsProps {
  classes: any;
}

const TalkingPoints: React.FC<ITalkingPointsProps> = ({ classes }) => {
  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" >
            1. Bipartisan Relationship
          </Typography>
          <Typography component="p">
            Strengthening the foundation: a strong US-Israel relationship as a
            bipartisan cause
          </Typography>
          <br />

          <Typography component="p" color="textSecondary" className={classes.points}>
            The United States and Israel share fundamental common values and
            national interests. A strong US-Israel relationship enhances those
            values and interests and strengthens the United States.
          </Typography>
        </CardContent>
      </Card>
      <br />
      <br />

      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            2. Supporting Security Assistance
          </Typography>
          <Typography component="p" color="textSecondary" className={classes.points}>
            Ask House & Senate to please support appropriation of $3.3 billion
            in U.S. security assistance to Israel and $500 million in
            cooperative missile defense funding for Fiscal Year 2020, as called
            for in the most recent Memorandum of Understanding (MOU).
          </Typography>
        </CardContent>
      </Card>
      <br />
      <br />

      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h4">
            3. Anti-BDS
          </Typography>
          <Typography component="p">
            Combating the anti-Semitic BDS movement
          </Typography>
          <br />

          <Typography component="h6" variant="h6">
            House: H. Res. 246
          </Typography>

          <Typography component="h6" variant="h6">
            Senate: S. Res. 120
          </Typography>
          <br />

          <Typography component="p" color="textSecondary" className={classes.points}>
            Ask House & Senate to support their respective Resolutions opposing
            efforts to delegitimize the State of Israel and the Global Boycott,
            Divestment, and Sanctions Movement targeting Israel.
          </Typography>
          <br />
          <Typography component="p" color="textSecondary" className={classes.points}>
            In the House, Reps. Brad Schneider (D-IL), Lee Zeldin (R-NY), Jerry
            Nadler (D-NY) and Ann Wagner (R-MO) have introduced a bipartisan
            anti-BDS resolution (H.Res.246).
          </Typography>
          <br />
          <Typography component="p" color="textSecondary" className={classes.points}>
            In the Senate, a companion resolution (S.Res.120) has been
            introduced by Sens. Ben Cardin (D-MD) and Rob Portman (R-OH).
          </Typography>
        </CardContent>
      </Card>
      <br />
      <br />

      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            4. JCPOA
          </Typography>
          <Typography component="p">
            Reminder of Iran's behavious since the JCPOA
          </Typography>
          <br />
          <Typography component="p" color="textSecondary" className={classes.points}>
            In deciding on the proper course of action with Iran, it is critical
            that the decision be informed by full awareness of Iran's continued
            and aggressive flouting of the norms of civilized behavior.
          </Typography>
        </CardContent>
      </Card>
      <br />
      <br />

      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h4">
            5. Sanctions against Hamas
          </Typography>
          <br />
          <Typography component="h6" variant="h6">
            House: Palestinian International Terrorism Support Prevention Act
            (H.R. 1850)
          </Typography>
          <br />
          <Typography component="h6" variant="h6">
            Senate: Support for a Senate counterpart to H.R. 1850
          </Typography>
          <br />
          <Typography component="p" color="textSecondary" className={classes.points}>
            Ask House to support the Palestinian International Terrorism Support
            Prevention Act (H.R. 1850) - authored by Reps. Brian Mast (R-FL) and
            Josh Gottheimer (D-NJ).
          </Typography>
          <br />
          <Typography component="p" color="textSecondary" className={classes.points}>
            Ask Senate to support a counterpart to H.R. 1850.
          </Typography>
        </CardContent>
      </Card>
      <br />
      <br />

      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h4">
            6. Security & Economics
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="p"
            color="textSecondary"
          >
            Enhancing U.S.-Israel Security & Economic Cooperation
          </Typography>
          <br />
          <Typography component="h6" variant="h6">
            House: U.S.-Israel Cooperation Enhancement & Regional Security Act
            (H.R.1837)
          </Typography>
          <br />
          <Typography component="h6" variant="h6">
            Senate: Thank for S.1
          </Typography>
          <br />
          <Typography component="p" color="textSecondary" className={classes.points}>
            Ask House to support the U.S.-Israel Cooperation Enhancement &
            Regional Security Act (H.R.1837) authored by Reps. Reps. Deutch
            (D-FL) and Wilson (R-SC).
          </Typography>
          <Typography component="p" color="textSecondary" className={classes.points}>
            Thank Senators who supported the Strenghtening America's Security in
            the Middle East Act (S.1).
          </Typography>
        </CardContent>
      </Card>
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default withRoot(withStyles(styles)(TalkingPoints));
