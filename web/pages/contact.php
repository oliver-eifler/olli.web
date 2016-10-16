<?php
$this->created = filectime(__FILE__);
$this->modified = filemtime(__FILE__);
$this->title = "Contact";
$this->description = "Um was geht's eigentlich";
$this->minify = true;
?>
<div class="hero typo">
    <div class="hero-content">
        <h1 class="text-smart"><span><?= $this->title ?></span></h1>
        <h3 class='text-smart hug'>Fill out and submit the form below and I’ll get back to you as soon as I can.</h3>
        <p><em>I’ll really try to get back to everyone, but sometimes it’s hard and I can’t guarantee anything.</em></p>
    </div>
</div>
<div class="content contact">
<form id='contactform' class='form'>
    <fieldset class="form-group formGrid">
        <div class='form-item'>
        <label class='form-label' for='name'>Name:</label>
        <input class='form-ctrl' type='text' name='name' placeholder='John Smith' />
        </div>
        <div class='form-item'>
        <label class='form-label' for='email'>eMail:</label>
        <input class='form-ctrl' type='email' name='email' placeholder='john.smith@earth.com' />
        </div>
    </fieldset>
    <fieldset class="form-group">
        <div class='form-item'>
        <label class='form-label' for='subject'>Subject:</label>
        <input class='form-ctrl' type='text' name='subject' placeholder='Your Subject...' />
        </div>
        <div class='form-item'>
        <label class='form-label' for='message'>Message:</label>
        <textarea class='form-ctrl' rows='5' cols='50' type='text' id='message' name='message' placeholder='Your Message...' ></textarea>
        </div>
    </fieldset>
    <fieldset class="form-group formFooter">
        <div class='form-info'>
            Bla Bla Bla
        </div>
        <div class='form-item FormFooter-push'>
            <button class='button' type='reset'><?= Component::get("icon","invader") ?>Reset</button>
        </div>
        <div class='form-item'>
            <button class='button button-primary' type='submit'><?= Component::get("icon","send") ?>Submit</button>
        </div>
    </fieldset>
</form>




</div>