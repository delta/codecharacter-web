const urlToDocs = 'https://delta.nitt.edu/codecharacter-docs/';

export const levels = [
  {
    description: `
      <div>
        <p> Still sleepy after drinking 2 cups of black coffee, only to enter your own nightmare - a tool to virtual reality. This is the 2070's where once in a dream, you can choose your own adventurous "nightmares". You have been mentally teleported back in the history of Mayan Civilization! Sadly, now disintegrated due to civil war. Each kingdom is forced to replace their soldiers with bots, that they can control from the safety of their forts. You have volunteered to help your kingdom control its army to claim as many treasures as possible. But first, you must train.
        </p>
        <h6>
          <b>
          Challenge:
          </b>
        </h6>
        <p>Move your bots to occupy all the flags.
        </p>
        <h6>
          <b>
          Inventory:
          </b>
        </h6>
        <p>Bots are accessed by traversing through the vector/array called ‘state.bots’, To use the first bot:
          <p><code> Bot bot = state.bots[0]</code></p>
        </p>
        <p>To traverse through all:</p>
        <p><code> for (auto &bot : state.bots)</code>
        <p style="text-align: center"> or </p>                
        <code>for ( size_t i=0; i < state.bots.size(); i++) </code></p>
        <p>Each bot can be move to a particular destination using </p>
        <p><code>bot.move(&ltdestination>)</code></p>
        <p> Here the destination is flag locations, which can be taken from the vector/array called:</p>
        <p> <code>state.flag_offsets</code></p>
        <p>For more details, check out <b> <a href=${urlToDocs} target="_blank" rel="noopener noreferrer">Docs</a> </b></p>
      </div>
    `,
    level: 1,
  },
  {
    description: `
      <div>
        <p> Excellent! Completing that task gave you a gush of dopamine release in your brain right!?  At this point you try to go back to your real world, but you fail to teleport yourself back. You are wondering why and set to try again- but just then a piercing sonorous siren rings in your kingdom, there has been an attack laid on your kingdom and you immediately are sent on an assignment to help fight against a local rival group. This is your chance to stand out among other trainees and be chosen to battle.
        </p>
        <h6>
          <b>
          Challenge:
          </b>
        </h6>
        <p>Transform your bots to towers at the flag locations.
        </p>
        <h6>
          <b>
          Inventory:
          </b>
        </h6>
        <p>A bot can be transformed into a tower:</p>
        <p><code>bot.transform()</code></p>
        <p>To transform a bot at a specific destination:</p>
        <p><code>bot.transform(&ltdestination>)</code></p>
        <p>Towers are accessed by traversing through the vector/array called:</p>
        <p><code>state.towers</code></p>
        <p>To use the first tower:</p>
        <p><code>Tower tower = state.towers[0]</code></p>
        <p>To traverse through all</p>
        <p><code>for (auto &tower : state.towers)</code></p>
        <p style="text-align: center">or</p>
        <p><code>for (size_t i=0; i < state.towers.size(); i++)</code></p>
        <p>Like before the destination is flag locations, which can be taken from the vector/array called:</p>
        <p><code>state.flag_offsets</code></p>
        <p>For more details, check out <b> <a href=${urlToDocs} target="_blank" rel="noopener noreferrer">Docs</a> </b></p>
      </div>
    `,
    level: 2,
  },
  {
    description: `
      <div>
        <p> Your body is feeling much better and try teleporting back to the real world only to find out that your brain has been hacked. Hacked by a strange VIRUS. This virus attack has taken over your network of neurons and frozen the network in your brain. You have no choice but to find the solution. Meanwhile you noticed that the bot has learned how to move to the correct place, but you cannot win the battle just by that. You must destroy the enemy also, and for that you need to train your bot to blast at the right position.
        </p>
        <h6>
          <b>
          Challenge:
          </b>
        </h6>
        <p>Blast your bots at flag locations to claim the flags.
        </p>
        <h6>
          <b>
          Inventory:
          </b>
        </h6>
        <p>You can blast a bot at its current location with:</p>
        <p><code>bot.blast()</code></p>
        <p>To blast a bot at a specific destination:</p>
        <p><code>bot.move(&ltdestination>)</code></p>
        <p>and when it reaches the position:</p>
        <p><code>bot.blast()</code></p>
        <p>or directly use:</p>
        <p><code>bot.blast(&ltdestination>)</code></p>
        <p>Like before the destination is flag locations, which can be taken from the vector/array called:</p>
        <p><code>state.flag_offsets</code></p>
        <p>For more details, check out <b> <a href=${urlToDocs} target="_blank" rel="noopener noreferrer">Docs</a> </b></p>
      </div>
    `,
    level: 3,
  },
  {
    description: `
      <div>
        <p> After completion you realize that you are slowly regaining consciousness in the real world. Completing each level successfully releases fiery hormones in your body which fires up your neurons which helps regain some part of your consciousness to the real world. In every battle, one saves his best troops for the perfect time, which can turn the result of the battle for them any time. The enemy has increased their power too. You have been granted time to become stronger. To learn and improvise against the wrong doers.
        </p>
        <h6>
          <b>
          Challenge:
          </b>
        </h6>
        <p>Transform to towers and blast them.</p>
        <h6>
          <b>
          Inventory:
          </b>
        </h6>
        <p>To transform bot into tower:</p>
        <p><code> bot.transform()</code></p>
        <p style="text-align: center">or</p>
        <p><code>bot.transform(&ltdestination>)</code></p>
        <p>To access all towers:</p>
        <p><code> for (auto &tower : state.towers)</code></p>
        <p style="text-align: center">or</p>
        <p><code>for (size_t i=0; i < state.towers.size(); i++)</code></p>
        <p>To blast a tower:</p>
        <p><code>bot.blast()</code></p>
        <p>Like before the destination is flag locations, which can be taken from the vector/array called: </p>
        <p><code>state.flag_offsets</code></p>
        <p>For more details, check out <b> <a href=${urlToDocs} target="_blank" rel="noopener noreferrer">Docs</a> </b></p>
      </div>
    `,
    level: 4,
  },
  {
    description: `
      <div>
        <p>You have arrived at the final stage. Once done you will be let loose of this mental state of captive. This task is where you must do some unlearning and relearning. Analyse opponents’ tactics and carefully apply the skills that you have learned up until now to finally defeat the brat once and for all!
        </p>
        <h6>
          <b>
          Challenge:
          </b>
        </h6>
        <p>Claim all the flags with everything you got!</p>
        <h6>
          <b>
          Inventory:
          </b>
        </h6>
        <p>To move your bot:</p>
        <p><code>bot.move(&ltdestination>)</code></p>
        <p>To transform bot into tower:</p>
        <p><code>bot.transform()</code></p>
        <p style="text-align: center">or</p>
        <p><code>bot.transform(&ltdestination>)</code></p>
        <p>To access all towers:</p>
        <p><code>for (auto &tower : state.towers)</code></p>
        <p style="text-align: center">or</p>
        <p><code>for (size_t i=0; i < state.towers.size(); i++)</code></p>
        <p>To blast a tower:</p>
        <p><code>bot.blast()</code></p>
        <p>Like before the destination is flag locations, which can be taken from the vector/array called:</p>
        <p><code>state.flag_offsets</code></p>
        <p>For more details, check out <b> <a href=${urlToDocs} target="_blank" rel="noopener noreferrer">Docs</a> </b></p>
      </div>
    `,
    level: 5,
  },
];
