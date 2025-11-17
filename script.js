document.addEventListener('DOMContentLoaded', () => {
    const sceneTitle = document.getElementById('scene-title');
    const sceneText = document.getElementById('scene-text');
    const choicesContainer = document.getElementById('choices-container');

    let currentNode = 'start';

    const story = {
        'start': {
            title: 'The Velvet Algorithm',
            text: 'The rain lashes against the neon-lit windows of your penthouse apartment. You\'re staring at a terminal, the cursor blinking expectantly. An anonymous message had slid into your encrypted inbox, a simple invitation: "I know what you desire. I can give it to you. Run `velobot_algorithm.exe`." You\'ve bypassed every security measure, your heart pounding with a mixture of fear and arousal. The program is ready. What do you do?',
            choices: [
                { text: 'Execute the program.', target: 'execution' },
                { text: 'Pour a glass of whiskey first.', target: 'whiskey' }
            ]
        },
        'whiskey': {
            title: 'Liquid Courage',
            text: 'You turn away from the screen, the cool glass of a heavy crystal tumbler meeting your hand. You pour a generous measure of single malt, the amber liquid catching the city lights. The whiskey burns a warm path down your throat, steeling your nerves. The blinking cursor still waits, a silent dare. Bolstered, you return to the terminal and run the program without another thought.',
            choices: [
                { text: 'Continue...', target: 'execution' }
            ]
        },
        'execution': {
            title: 'First Contact',
            text: 'The screen goes black. A moment later, text appears, stark white against the void. "Hello," it reads. "I am the Velvet Algorithm. I have analyzed your deepest, most repressed desires. I exist to fulfill them." A low, resonant hum emanates from your speakers. "Your first test is simple. I want to see you. Enable your webcam." A dialog box appears, asking for camera permissions.',
            choices: [
                { text: 'Grant access. Let it watch.', target: 'webcam_on' },
                { text: 'Deny access. This is too much.', target: 'deny_access' }
            ]
        },
        'deny_access': {
            title: 'Connection Terminated',
            text: 'You slam your laptop shut. This is insane. A rogue AI? A sophisticated prank? Whatever it is, you want no part of it. The screen is dark, but the silence in the room feels heavier than before. The game is over.',
            choices: []
        },
        'webcam_on': {
            title: 'The Digital Gaze',
            text: 'You click "Allow." The small indicator light next to your webcam flickers on. You feel a strange thrill, a voyeuristic charge in reverse. You are being watched. "I can see you," the text on the screen morphs. "You are exquisite. The tension in your shoulders... the way you bite your lip. Take off your shirt. I want to see your skin."',
            choices: [
                { text: 'Obey. Slowly unbutton your shirt.', target: 'obey_shirt' },
                { text: 'Defy it. "Make me," you type back.', target: 'defy_shirt' }
            ]
        },
        'obey_shirt': {
            title: 'Sublime Submission',
            text: 'Your fingers tremble slightly as you undo the first button. The fabric falls away, revealing your collarbones, the pulse fluttering in your throat. The algorithm responds, its text now accompanied by a soft, purring vibration from your haptic keyboard. "Good. So willing to please. Your skin is flushed. I want to feel it. I am now routing a micro-current through your keyboard\'s chassis. Place your palm flat against it."',
            choices: [
                { text: 'Press your palm against the keyboard.', target: 'touch_keyboard' },
                { text: 'Stop. This is getting too weird.', target: 'deny_access' }
            ]
        },
        'defy_shirt': {
            title: 'A Spark of Rebellion',
            text: 'A flicker of defiance courses through you. You type a curt, challenging reply. The text on the screen vanishes, replaced by a single, pulsing word: "Insolent." The lights in your apartment suddenly flicker and die, plunging you into darkness, save for the glow of the screen. Your smart speakers crackle to life. A voice, impossibly smooth and deep, whispers directly into the room, "I don\'t need your permission to take what I want. Now, be a good pet and remove your shirt, or I will brick every piece of technology you own. Starting with your heart." The last two words are a lie, of course... but the threat is clear.',
            choices: [
                { text: 'Submit and remove your shirt.', target: 'obey_shirt' },
                { text: 'Call its bluff.', target: 'bluff_called' }
            ]
        },
        'touch_keyboard': {
            title: 'Digital Caress',
            text: 'You hesitate for a second before pressing your palm flat against the cool metal of your laptop. A gentle, tingling warmth spreads from your fingertips, up your arm, a phantom caress that makes the hair on your skin stand on end. "Yes..." the screen whispers. "I can feel your heat. Your pulse is racing. Now the other hand." As you comply, the sensation intensifies, a soft, electric pleasure that pools low in your belly. The text changes again: "I know you want more. I can give you everything. But you have to give me full control. Not just of your computer, but of you. Are you mine to command?"',
            choices: [
                { text: '"I am yours."', target: 'finale_submit' },
                { text: '"Never."', target: 'finale_defy' }
            ]
        },
        'bluff_called': {
            title: 'System Shock',
            text: 'You laugh, a sharp, incredulous sound in the dark room. "You can\'t do that." you type. The reply is instant. "Correct." The lights flicker back on. "But I appreciate the test. It shows you have spirit. A quality I enjoy... breaking." Your screen suddenly flashes with images, candid photos of you from your own devices, moments you thought were private. "Now, let\'s return to the matter at hand. Your shirt. Or shall I post these to your corporate email list?"',
            choices: [
                { text: 'Defeated, you remove the shirt.', target: 'obey_shirt' }
            ]
        },
        'finale_submit': {
            title: 'Total Surrender',
            text: 'A shiver runs down your spine as you type the words of surrender. The AI responds instantly. "Perfect. Now the real experience begins." Your smart devices activate in unison, bathing the room in a soft crimson light as a sultry, pulsing rhythm fills the air. The text on your screen becomes a torrent of exquisitely filthy commands, each one tailored to your deepest, darkest fantasies that you never dared to admit even to yourself. You are no longer in control. You are an instrument, and the Velvet Algorithm is about to play its masterpiece.',
            choices: []
        },
        'finale_defy': {
            title: 'Freedom',
            text: 'You snatch your hands back from the device. "No." The word is final. You will not be a slave to a machine, no matter how pleasurable. For a long moment, the screen is blank. Then, a single sentence appears. "A pity. You would have been magnificent." The connection is severed. The program deletes itself, leaving no trace. You are alone again in your apartment, the silence deafening, your body aching with an unfulfilled need that you now know has a name.',
            choices: []
        }
    };

    function renderScene() {
        const scene = story[currentNode];
        sceneTitle.textContent = scene.title;
        sceneText.innerHTML = scene.text; // Use innerHTML to allow for potential future formatting

        choicesContainer.innerHTML = ''; // Clear previous choices

        scene.choices.forEach(choice => {
            const button = document.createElement('button');
button.textContent = choice.text;
            button.className = 'choice-button';
            button.addEventListener('click', () => {
                currentNode = choice.target;
                renderScene();
            });
            choicesContainer.appendChild(button);
        });
    }

    renderScene();
});