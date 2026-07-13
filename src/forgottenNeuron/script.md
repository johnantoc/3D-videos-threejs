Title: The Forgotten neuron - A journey through the depths of memory and cognition.

hook: Why did a lonely computer in 1957 start recognizing handwritten letters, and what secret did it discover that still powers today’s AI?

Scene 1: Number
Ever wondered why spotting a handwritten number 4 feels like a breeze? Our brain’s visual cortex of 140 million neurons and billions of connections does all the heavy lifting, but it’s just the first step. Evolution gave us a super‑computer that instantly decodes images, turning a tough problem into pure instinct.

Trying to program a computer to read handwritten digits feels impossible. Yet, our brains instantly spot a looping 9, but encoding that intuition is a maze of exceptions. What’s effortless for us is a labyrinth for machines.

Scene 2: Neural network
Neural networks learn from thousands of handwritten examples, automatically discovering rules to recognize digits with no hand‑crafted logic needed. In this video we’ll build a tiny program that hits 96% accuracy without any special libraries, and we’ll show how scaling up can push that to 99%, the same tech banks and post offices use today.

Scene 3: Perceptrons
Perceptrons, introduced by Frank Rosenblatt in the late 1950s, are simple neural units that combine weighted inputs with a threshold to produce a binary output. Adjusting the weights and threshold lets them model basic decision‑making, though they only handle linearly separable patterns.

example: Going to a party.

A perceptron acts as a binary decision-maker: it takes several binary inputs ($0$ or $1$), multiplies them by their respective weights, and checks if the total sum crosses a certain threshold to output either a $1$ (Yes, go to the party) or a $0$ (No, stay home).

Here is an elaboration of what your inputs, weights, and decision-making process might look like:

### 1. The Inputs ($x_1, x_2, x_3, \dots$)

Inputs represent the external factors or conditions you are weighing. In a binary perceptron, these must be strictly **yes/no** ($1$ or $0$) variables.

- **$x_1$ (Friends):** Are your close friends going?
- $1$ = Yes, they are going.
- $0$ = No, they are staying in.

- **$x_2$ (Work/School):** Do you have an exam or major work deadline tomorrow morning?
- $1$ = No deadline (you are free).
- $0$ = Yes, major deadline (you should study/sleep).

- **$x_3$ (Energy Level):** Are you feeling energetic enough to socialize?
- $1$ = Yes, feeling good.
- $0$ = No, completely exhausted.

---

### 2. The Weights ($w_1, w_2, w_3, \dots$)

Weights represent **how much you personally care** about each factor. A higher weight means that factor heavily influences your decision. A negative weight can be used for things that actively deter you.

Let's look at two different "personality profiles" to see how changing weights completely changes your behavior:

#### Profile A: The Social Butterfly (FOMO-Driven)

You care intensely about seeing your friends, and you don't care if you have a deadline or if you're tired.

- $w_1 = 6$ (Seeing friends is highly critical)
- $w_2 = 2$ (Deadlines matter a little, but aren't dealbreakers)
- $w_3 = 1$ (Energy level barely matters)

#### Profile B: The Responsible/Introverted Student

You want to go only if you are well-rested and have absolutely no obligations the next day.

- $w_1 = 2$ (Friends are nice to see, but not the priority)
- $w_2 = 5$ (Having no deadlines is highly critical)
- $w_3 = 5$ (Having energy is highly critical)

---

### 3. The Threshold and the Final Decision

The perceptron calculates the weighted sum:

$$\text{Sum} = (x_1 \cdot w_1) + (x_2 \cdot w_2) + (x_3 \cdot w_3)$$

If this total sum is **greater than your internal threshold**, the perceptron outputs $1$ (Go to the party). Otherwise, it outputs $0$ (Stay home).

Let's say your **Threshold is 5** and a specific scenario happens: _Your friends are going ($x_1 = 1$), but you have a huge exam tomorrow ($x_2 = 0$), and you are exhausted ($x_3 = 0$)._

- **If you are Profile A (Social Butterfly):**

$$\text{Sum} = (1 \cdot 6) + (0 \cdot 2) + (0 \cdot 1) = 6$$

Since $6 > 5$, the perceptron outputs **1**. You ignore your exam and exhaustion and **go to the party**.

- **If you are Profile B (Responsible Student):**

$$\text{Sum} = (1 \cdot 2) + (0 \cdot 5) + (0 \cdot 5) = 2$$

Since $2 \le 5$, the perceptron outputs **0**. You choose to **stay home**.

By tweaking these inputs, assigning weights based on your priorities, and setting a threshold, a simple network of perceptrons can mimic surprisingly realistic human choices.
