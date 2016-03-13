<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>oliver-eifler.info</title>
    <style>
        <?php include('css/layout.min.css');?>
    </style>
    <script>/* initial script*/</script>
    <noscript><link href="css/icons-fallback.min.css" rel="stylesheet"></noscript>
</head>
<body class="flex">
<div class="flex-header panel">
    <header>
        <a class="header" href='#'>
            <div class="header-logo">
            <i class="icon-olli avatar"></i>
            </div>
            <div class="header-text">
                <h1>Oliver Jean Eifler</h1>
                <small>Programmierer Techniker Künstler</small>
            </div>
        </a>
    </header>
    <aside>
        <nav role="navigation">
            <div class="navigation">
                <div class="links">
                    <div class="links-cat">
                        <a href="#">Home</a>
                        <a href="#">Articles</a>
                        <a href="#">Misc</a>
                    </div>
                    <div class="links-cat">
                        <a href="#">About</a>
                        <a href="#">Contact</a>
                    </div>
                </div>
                <div class="social">
                    <a href="#" class="social-icon" title="Olli on GitHub"><i class="icon-github" aria-hidden="true"></i><span>GitHub</span></a>
                    <a href="#" class="social-icon" title="Olli on Codepen"><i class="icon-codepen" aria-hidden="true"></i><span>CodePen</span></a>
                    <a href="#" class="social-icon" title="Olli on Twitter"><i class="icon-twitter" aria-hidden="true"></i><span>Twitter</span></a>
                    <a href="#" class="social-icon" title="Olli on Facebook"><i class="icon-facebook" aria-hidden="true"></i><span>Facebook</span></a>
                </div>
            </div>

        </nav>
    </aside>
</div>
<div class="flex-content content" role="main">
    <div class="content-width">
        <article>
            <h2 id="introductions">Introductions</h2>

            <p>Hi I&#39;m Professor Franklin Risby, pleased to make your acquaintance. We&#39;ll be spending some time
                together as I&#39;m supposed to teach you a bit about functional programming. But enough about me, what
                about you? I&#39;m hoping you&#39;re familiar with the JavaScript language, have a teensy bit of
                Object-Oriented experience, and fancy yourself a working class programmer. You don&#39;t need to have a
                Ph.D in Entomology, you just need to know how to find and kill some bugs.</p>

            <p>I won&#39;t assume any previous functional programming knowledge because we both know what happens when
                you assume, but I will expect you to have run into some of the unfavorable situations that arise from
                working with mutable state, unrestricted side effects, and unprincipled design. Now that we&#39;ve been
                properly introduced, let&#39;s get on with it.</p>

            <p>The purpose of this chapter is to give you a feel for what we&#39;re after when we write functional
                programs. We must have some idea about what makes a program <em>functional</em> or we&#39;ll find
                ourselves scribbling aimlessly, avoiding objects at all costs - a clumsy endeavor indeed. We need a
                bullseye to hurl our code toward, some celestial compass for when the waters get rough.</p>

            <p>Now there are some general programming principles, various acronymic credos that guide us through the
                dark tunnels of any application: DRY (don&#39;t repeat yourself), loose coupling high cohesion, YAGNI
                (ya ain&#39;t gonna need it), principle of least surprise, single responsibility, and so on.</p>

            <p>I won&#39;t belabor listing each and every guideline I&#39;ve heard throughout the years... the point is
                that they hold up in a functional setting, though they&#39;re merely tangential to our goal. What I&#39;d
                like you to get a feel for now, before we get any further, is our intention when we poke and prod at the
                keyboard; our functional Xanadu.</p>
            <!--BREAK-->
            <h2 id="a-brief-encounter">A brief encounter</h2>

            <p>Let&#39;s start with a touch of insanity. Here is a seagull application. When flocks conjoin they become
                a larger flock and when they breed they increase by the number of seagulls with whom they&#39;re
                breeding. Now this is not intended to be good Object-Oriented code, mind you, it is here to highlight
                the perils of our modern, assignment based approach. Behold:</p>
<pre class="highlight"><code class="hljs javascript"><span class="hljs-keyword">var</span> Flock = <span
        class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(n)</span> </span>{
    <span class="hljs-keyword">this</span>.seagulls = n;
    };

    Flock.prototype.conjoin = <span class="hljs-function"><span class="hljs-keyword">function</span><span
            class="hljs-params">(other)</span> </span>{
    <span class="hljs-keyword">this</span>.seagulls += other.seagulls;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
    };

    Flock.prototype.breed = <span class="hljs-function"><span class="hljs-keyword">function</span><span
            class="hljs-params">(other)</span> </span>{
    <span class="hljs-keyword">this</span>.seagulls = <span class="hljs-keyword">this</span>.seagulls * other.seagulls;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
    };

    <span class="hljs-keyword">var</span> flock_a = <span class="hljs-keyword">new</span> Flock(<span
            class="hljs-number">4</span>);
    <span class="hljs-keyword">var</span> flock_b = <span class="hljs-keyword">new</span> Flock(<span
            class="hljs-number">2</span>);
    <span class="hljs-keyword">var</span> flock_c = <span class="hljs-keyword">new</span> Flock(<span
            class="hljs-number">0</span>);

    <span class="hljs-keyword">var</span> result =
    flock_a.conjoin(flock_c).breed(flock_b).conjoin(flock_a.breed(flock_b)).seagulls;
    <span class="hljs-comment">//=&gt; 32</span>
</code></pre>
            <p>Who on earth would craft such a ghastly abomination? It is unreasonably difficult to keep track of the
                mutating internal state. And, good heavens, the answer is even incorrect! It should have been
                <code>16</code>, but <code>flock_a</code> wound up permanently altered in the process. Poor <code>flock_a</code>.
                This is anarchy in the I.T.! This is wild animal arithmetic!</p>

            <p>If you don&#39;t understand this program, it&#39;s okay, neither do I. The point is that state and
                mutable values are hard to follow even in such a small example.</p>

            <p>Let&#39;s try again with a more functional approach:</p>
<pre class="highlight"><code class="hljs javascript"><span class="hljs-keyword">var</span> conjoin = <span
        class="hljs-function"><span class="hljs-keyword">function</span><span
        class="hljs-params">(flock_x, flock_y)</span> </span>{ <span class="hljs-keyword">return</span> flock_x +
    flock_y };
    <span class="hljs-keyword">var</span> breed = <span class="hljs-function"><span class="hljs-keyword">function</span><span
            class="hljs-params">(flock_x, flock_y)</span> </span>{ <span class="hljs-keyword">return</span> flock_x *
    flock_y };

    <span class="hljs-keyword">var</span> flock_a = <span class="hljs-number">4</span>;
    <span class="hljs-keyword">var</span> flock_b = <span class="hljs-number">2</span>;
    <span class="hljs-keyword">var</span> flock_c = <span class="hljs-number">0</span>;

    <span class="hljs-keyword">var</span> result = conjoin(breed(flock_b, conjoin(flock_a, flock_c)), breed(flock_a,
    flock_b));
    <span class="hljs-comment">//=&gt;16</span>
</code></pre>
            <p>Well, we got the right answer this time. There&#39;s much less code. The function nesting is a tad
                confusing...[^we&#39;ll remedy this sitation in ch5]. It&#39;s better, but let&#39;s dig deeper. There
                are benefits to calling a spade a spade. Had we done so, we might have seen we&#39;re just working with
                simple addition (<code>conjoin</code>) and multiplication (<code>breed</code>).</p>

            <p>There&#39;s really nothing special at all about these two functions other than their names. Let&#39;s
                rename our custom functions to reveal their true identity.</p>
<pre class="highlight"><code class="hljs javascript"><span class="hljs-keyword">var</span> add = <span
        class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(x, y)</span> </span>{
    <span class="hljs-keyword">return</span> x + y };
    <span class="hljs-keyword">var</span> multiply = <span class="hljs-function"><span
            class="hljs-keyword">function</span><span class="hljs-params">(x, y)</span> </span>{ <span
            class="hljs-keyword">return</span> x * y };

    <span class="hljs-keyword">var</span> flock_a = <span class="hljs-number">4</span>;
    <span class="hljs-keyword">var</span> flock_b = <span class="hljs-number">2</span>;
    <span class="hljs-keyword">var</span> flock_c = <span class="hljs-number">0</span>;

    <span class="hljs-keyword">var</span> result = add(multiply(flock_b, add(flock_a, flock_c)), multiply(flock_a,
    flock_b));
    <span class="hljs-comment">//=&gt;16</span>
</code></pre>
            <p>And with that, we gain the knowledge of the ancients:</p>
<pre class="highlight"><code class="hljs javascript"><span class="hljs-comment">// associative</span>
    add(add(x, y), z) == add(x, add(y, z));

    <span class="hljs-comment">// commutative</span>
    add(x, y) == add(y, x);

    <span class="hljs-comment">// identity</span>
    add(x, <span class="hljs-number">0</span>) == x;

    <span class="hljs-comment">// distributive</span>
    multiply(x, add(y,z)) == add(multiply(x, y), multiply(x, z));
</code></pre>
            <p>Ah yes, those old faithful mathematical properties should come in handy. Don&#39;t worry if you didn&#39;t
                know them right off the top of your head. For a lot of us, it&#39;s been a while since we&#39;ve
                reviewed this information. Let&#39;s see if we can use these properties to simplify our little seagull
                program.</p>
<pre class="highlight"><code class="hljs javascript"><span class="hljs-comment">// Original line</span>
    add(multiply(flock_b, add(flock_a, flock_c)), multiply(flock_a, flock_b));

    <span class="hljs-comment">// Apply the identity property to remove the extra add (add(flock_a, flock_c) == flock_a)</span>
    add(multiply(flock_b, flock_a), multiply(flock_a, flock_b));

    <span class="hljs-comment">// Apply distributive property to achieve our result</span>
    multiply(flock_b, add(flock_a, flock_a));
</code></pre>
            <p>Brilliant! We didn&#39;t have to write a lick of custom code other than our calling function. We include
                <code>add</code> and <code>multiply</code> definitions here for completeness, but there is really no
                need to write them - we surely have an <code>add</code> and <code>multiply</code> provided by some
                previously written library.</p>

            <p>You may be thinking &quot;how very strawman of you to put such a mathy example up front&quot;. Or &quot;real
                programs are not this simple and cannot be reasoned about in such a way&quot;. I&#39;ve chosen this
                example because most of us already know about addition and multiplication so it&#39;s easy to see how
                math can be of use to us here.</p>

            <p>Don&#39;t despair, throughout this book, we&#39;ll sprinkle in some category theory, set theory, and
                lambda calculus to write real world examples that achieve the same simplicity and results as our flock
                of seagulls example. You needn&#39;t be a mathematician either, it will feel just like using a normal
                framework or api.</p>

            <p>It may come as a surprise to hear that we can write full, everyday applications along the lines of the
                functional analog above. Programs that have sound properties. Programs that are terse, yet easy to
                reason about. Programs that don&#39;t reinvent the wheel at every turn. Lawlessness is good if you&#39;re
                a criminal, but in this book, we&#39;ll want to acknowledge and obey the laws of math.</p>

            <p>We&#39;ll want to use the theory where every piece tends to fit together so politely. We&#39;ll want to
                represent our specific problem in terms of generic, composable bits and then exploit their properties
                for our own selfish benefit. It will take a bit more discipline than the &quot;anything goes&quot;
                approach of imperative[^We&#39;ll go over the precise definition of imperative later in the book, but
                for now it&#39;s anything other than functional programming] programming, but the payoff of working
                within a principled, mathematical framework will astound you.</p>

            <p>We&#39;ve seen a flicker of our functional north star, but there are a few concrete concepts to grasp
                before we can really begin our journey.</p>

            <p><a href="/fahrzeuge/ch2">Chapter 2: First Class Functions</a></p>
        </article>
    </div>
</div>
<div class="'flex-footer footer">
    <div class="maxfooter">
    <footer>
        <i class="icon-invader"></i> made with care by <i class="icon-olli-small"></i> Olli.
    </footer>
    </div>
</div>
<script src="js/async.min.js" async></script>
</body>
</html>