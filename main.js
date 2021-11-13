// Clear text values on load
document.getElementById('input_text').value = '';
document.getElementById('input_key').value = '';
document.getElementById('output_text').value = '';

// Swap input with output
function swapIOButtonPress()
{
    var input_text = document.getElementById('input_text');
    var output_text = document.getElementById('output_text');
    var temp = input_text.value;

    input_text.value = output_text.value;
    output_text.value = temp;
}

// Swap Key with Output
function swapKOButtonPress()
{
    var key_text = document.getElementById('input_key');
    var output_text = document.getElementById('output_text');
    var temp = key_text.value;

    key_text.value = output_text.value;
    output_text.value = temp;
}

// Perform encryption calculation
function encryptButtonPress()
{
    var text = document.getElementById('input_text').value;
    var key = document.getElementById('input_key').value;

    if (text == '' || key == '') { return; }

    document.getElementById('output_text').value = shrubEncrypt(text, key, usesHexKey());

    scrollToBottom();
}

// Perform decryption calculation
function decryptButtonPress()
{
    var text = document.getElementById('input_text').value;
    var key = document.getElementById('input_key').value;

    if (text == '' || key == '') { return; }

    document.getElementById('output_text').value = shrubDecrypt(text, key, usesHexKey(), usesHexDecrypt());

    scrollToBottom();
}

// Generate a random key matching the length
// of the inputted text
function generateRandomKeyButtonPress()
{
    alert("This feature is disabled for this version!");
}

function toggleHexKeyButtonPress()
{
    var btn = document.getElementById('toggle_hex_key');

    if (btn.classList.contains('enabled'))
    {
        btn.classList.remove('enabled');
        btn.classList.add('disabled');
        btn.innerText = "Hex Key Off";
    }
    else
    {
        btn.classList.remove('disabled');
        btn.classList.add('enabled');
        btn.innerText = "Hex Key On";
    }
}

function toggleHexDecryptButtonPress()
{
    var btn = document.getElementById('toggle_hex_decrypt');

    if (btn.classList.contains('enabled')) 
    {
        btn.classList.remove('enabled');
        btn.classList.add('disabled');
        btn.innerText = "Hex Decrypt Off";
    }
    else 
    {
        btn.classList.remove('disabled');
        btn.classList.add('enabled');
        btn.innerText = "Hex Decrypt On";
    }
}

function usesHexKey()
{
    return document.getElementById('toggle_hex_key').classList.contains('enabled');
}

function usesHexDecrypt()
{
    return document.getElementById('toggle_hex_decrypt').classList.contains('enabled');
}

function scrollToBottom()
{
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function autoFillKey()
{
    if (usesHexKey()) { return; }

    var keybox = document.getElementById('input_key');
    var inputbox = document.getElementById('input_text');

    while (keybox.value.length < inputbox.value.length)
    {
        keybox.value += '.';
    }
}

document.onkeydown = function(e)
{
    if (e.keyCode == '45')
    {
        autoFillKey();
    }
};