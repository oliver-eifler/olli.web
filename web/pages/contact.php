<?php
$this->created = filectime(__FILE__);
$this->modified = filemtime(__FILE__);
$this->title = "Contact";
$this->description = "Um was geht's eigentlich";
?>
<div class="hero">
    <div class="hero-content">
        <h1 class="text-smart"><span><?= $this->title ?></span></h1>
        <h3 class='hug'>Fill out and submit the form below and I’ll get back to you as soon as I can.</h3>
        <p><em>I’ll really try to get back to everyone, but sometimes it’s hard and I can’t guarantee anything.</em></p>
    </div>
</div>
<div class="content contact">
<form id="contactform" class="form">
<div class="form-row form-group">
    <div class="form-col">
        <label class="form-label" for="name">Name:</label>
        <input class="form-ctrl" type="text" name="name" placeholder="John Smith" />
    </div>
    <div class="form-col">
        <label class="form-label" for="email">eMail:</label>
        <input class="form-ctrl" type="text" name="email" placeholder="john.smith@earth.com" />
    </div>
</div>
    <div class="form-row">
        <label class="form-label" for="subject">Subject:</label>
        <input class="form-ctrl" type="text" name="subject" placeholder="Your Subject..." />
    </div>
    <div  class="form-row">
        <label class="form-label" for="message">Message:</label>
        <textarea class="form-ctrl" rows="5" cols="50" type="text" id="message" name="message" placeholder="Your Message..." ></textarea>
    </div>
    <div class="form-row">
    <button type="submit">Send Message</button>
    </div>
</form>




</div>