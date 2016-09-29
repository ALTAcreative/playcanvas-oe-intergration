/**
 * To save battery and memory usage, PlayCanvas container in Origami Engine is destroyed every time
 * the app goes in background mode, and is restored every time it returns back to foreground.
 * To remember the last state it was in before termination a global helper class PCState is introduced.
 * PCState is a custom solution implemented by Origami Engine execution environment and is not a part of original PlayCanvas specs.
 * 
 * Attach this script to any entity in your scene hierarchy.
 * Use custom events to communicate important state variables from other scripts.
 */


var State = pc.createScript ('State');


State.prototype.initialize = function ()
{
    // foo and bar are state variables we want to save and restore
    // they're usually supplied via event channels from other scripts
    
    this.app.on ('foo:updated', this.onFooUpdated, this);
    this.app.on ('bar:updated', this.onBarUpdated, this);
};


State.prototype.postInitialize = function ()
{
    if (window['PCState'])
    {
        var pcs = window['PCState'];
        
        // requesting and handling previously saved state if it exists
        // doing that in postInitialize() is critical because other scripts
        // will need to subscribe to 'state:loaded' event in initialize() first
        this.loadState (pcs.state);
        
        // adding handler for saving state upon container termination
        pcs.addSaveHandler (this.saveState.bind(this));
    }
};


State.prototype.onFooUpdated = function (foo)
{
    this.foo = foo;
};


State.prototype.onBarUpdated = function (bar)
{
    this.bar = bar;
};


State.prototype.loadState = function (state)
{
    // defaults
    this.foo = 'none';
    this.bar = 0;
    
    // if state exists we override defaults
    if (state)
    {
        this.foo = typeof state.foo !== 'undefined' ? state.foo : this.foo;
        this.bar = typeof state.bar !== 'undefined' ? state.bar : this.bar;
    }
    
    // sending custom event to all subscribed script instances
    // so they would transition into desired state accordingly
    this.app.fire ('state:loaded', {foo: this.foo, bar: this.bar});
};


State.prototype.saveState = function (state)
{
    // saving state variables to state object supplied in callback
    state.foo = this.foo;
    state.bar = this.bar;
};
